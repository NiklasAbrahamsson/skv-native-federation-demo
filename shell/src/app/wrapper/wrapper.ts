import {
  Component,
  ElementRef,
  DestroyRef,
  Injector,
  OnInit,
  effect,
  inject,
  input,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { loadRemote } from '@module-federation/enhanced/runtime';
import { AuthService } from '@skv/shared';

/**
 * Configuration for a web-component-based remote micro frontend.
 *
 * This is passed via the route's `data` property so the same
 * WrapperComponent can host any framework's Custom Element.
 */
export interface WrapperConfig {
  /** Name of the remote as registered in federation.manifest.json. */
  remoteName: string;
  /** The exposed module key (e.g. './web-component'). */
  exposedModule: string;
  /** The custom element tag name (e.g. 'sub-app-react'). */
  elementName: string;
  /**
   * If true, use @module-federation/enhanced runtime to load the remote
   * (for remotes built with @module-federation/vite).
   * If false/undefined, use @angular-architects/native-federation.
   */
  useModuleFederation?: boolean;
}

/**
 * Generic wrapper that loads a federation remote which registers
 * a Custom Element, then creates that element in the DOM.
 *
 * Supports BOTH federation protocols:
 * - Native Federation (remoteEntry.json + import maps) for NF-based remotes
 * - Module Federation (remoteEntry.js + MF runtime) for MF-based remotes
 *
 * This is the bridge between Angular's router and any non-Angular
 * micro frontend (React, Vue, Svelte, etc.) that exposes itself as
 * a Web Component.
 *
 * Auth state from @skv/shared is passed to the custom element as
 * attributes, so the remote can display shared auth data without
 * depending on Angular's DI system.
 */
@Component({
  selector: 'app-wrapper',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: '',
})
export class WrapperComponent implements OnInit {
  private readonly elm = inject(ElementRef);
  private readonly auth = inject(AuthService);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);

  /** Route data containing the WrapperConfig. */
  readonly config = input.required<WrapperConfig>();

  private customElement: HTMLElement | null = null;

  async ngOnInit() {
    const { remoteName, exposedModule, elementName, useModuleFederation } = this.config();

    // Load the remote module — this triggers registration of the Custom Element.
    // Use the appropriate federation runtime based on the config flag.
    if (useModuleFederation) {
      // Module Federation: load via @module-federation/enhanced runtime.
      // Format is 'remoteName/exposedModule' (without the leading './')
      const mfPath = `${remoteName}/${exposedModule.replace('./', '')}`;
      await loadRemote(mfPath);
    } else {
      // Native Federation: load via @angular-architects/native-federation.
      await loadRemoteModule(remoteName, exposedModule);
    }

    // Create the custom element and append it to this component's host.
    this.customElement = document.createElement(elementName);
    this.customElement.setAttribute('base-path', `/${remoteName}`);
    this.elm.nativeElement.appendChild(this.customElement);

    // Reactively sync auth state to the custom element's attributes.
    // Every time the Angular signal changes, the attribute is updated,
    // which triggers the Custom Element's attributeChangedCallback.
    const effectRef = effect(() => {
      const user = this.auth.currentUser();
      if (this.customElement) {
        if (user) {
          this.customElement.setAttribute('user-data', JSON.stringify(user));
        } else {
          this.customElement.removeAttribute('user-data');
        }
      }
    }, { injector: this.injector });

    // Clean up the custom element and effect when the component is destroyed.
    this.destroyRef.onDestroy(() => {
      effectRef.destroy();
      if (this.customElement) {
        this.customElement.remove();
        this.customElement = null;
      }
    });
  }
}
