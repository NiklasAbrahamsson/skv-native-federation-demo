/**
 * Bootstrap module for the Vue micro frontend.
 *
 * This file registers a Custom Element (<sub-app-vue>) that wraps the
 * entire Vue application. This follows the same pattern as sub-app-react:
 *
 * 1. The Angular shell calls loadRemote('sub-app-vue/web-component')
 *    via @module-federation/enhanced/runtime
 * 2. That triggers this file, which registers the custom element
 * 3. The Angular WrapperComponent creates a <sub-app-vue> DOM element
 * 4. The browser calls connectedCallback(), which mounts Vue into it
 *
 * Auth state is received from the Angular shell via element attributes,
 * bridging Angular signals -> DOM attributes -> Vue props.
 */
import { createApp, ref, type App as VueApp } from 'vue';
import App from './App.vue';
import { createAppRouter } from './router';
import type { UserData } from './types';

class SubAppVueElement extends HTMLElement {
  private vueApp: VueApp | null = null;
  private mountPoint: HTMLDivElement | null = null;
  private userData = ref<UserData | null>(null);
  private basePath = ref('/sub-app-vue');

  /**
   * Observed attributes -- when the Angular wrapper sets these,
   * attributeChangedCallback fires and we update the reactive refs.
   */
  static get observedAttributes() {
    return ['user-data', 'base-path'];
  }

  connectedCallback() {
    this.mountVue();
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ) {
    if (name === 'user-data') {
      this.userData.value = this.parseUserData(newValue);
    } else if (name === 'base-path') {
      this.basePath.value = newValue || '/sub-app-vue';
    }
    // Vue's reactivity handles re-renders automatically via the injected refs.
  }

  disconnectedCallback() {
    if (this.vueApp) {
      this.vueApp.unmount();
      this.vueApp = null;
    }
    if (this.mountPoint) {
      this.mountPoint.remove();
      this.mountPoint = null;
    }
  }

  private mountVue() {
    if (this.vueApp) return;

    // Parse initial attribute values
    this.userData.value = this.parseUserData(this.getAttribute('user-data'));
    const bp = this.getAttribute('base-path');
    if (bp) this.basePath.value = bp;

    // Create a mount point inside the custom element
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);

    // Create Vue app with initial prop values
    const router = createAppRouter(this.basePath.value);

    this.vueApp = createApp(App, {
      userData: this.userData.value,
      basePath: this.basePath.value,
    });

    this.vueApp.use(router);

    // Provide reactive refs so the App can respond to attribute changes
    // without needing to remount the entire Vue application.
    this.vueApp.provide('userData', this.userData);
    this.vueApp.provide('basePath', this.basePath);

    this.vueApp.mount(this.mountPoint);
  }

  private parseUserData(raw: string | null): UserData | null {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserData;
    } catch {
      return null;
    }
  }
}

// Register the custom element. The Angular shell will create this element
// after loading the remote module.
if (!customElements.get('sub-app-vue')) {
  customElements.define('sub-app-vue', SubAppVueElement);
}
