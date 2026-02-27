<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';
import type { UserData } from './types';

// Props are set during initial mount. For reactive updates from
// the custom element's attributeChangedCallback, we use injected refs.
const props = defineProps<{
  userData: UserData | null;
  basePath: string;
}>();

// Injected reactive refs from the custom element wrapper.
// Falls back to prop values when running standalone.
const injectedUserData = inject<Ref<UserData | null>>('userData');

const currentUser = computed(() =>
  injectedUserData ? injectedUserData.value : props.userData
);
const isAuthenticated = computed(() => currentUser.value !== null);
</script>

<template>
  <div class="vue-app">
    <div class="vue-badge">Vue 3 + Vite + Module Federation</div>
    <div v-if="isAuthenticated" class="auth-info">
      Logged in as: <strong>{{ currentUser!.displayName }}</strong>
      ({{ currentUser!.role }})
    </div>
    <div v-else class="auth-info auth-info--guest">
      Not logged in (use the shell to log in)
    </div>
    <router-view />
  </div>
</template>

<style scoped>
.vue-app {
  padding: 1.5rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.vue-badge {
  display: inline-block;
  background: #42b883;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.auth-info {
  background: #e8f5e9;
  border-left: 4px solid #42b883;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 0 4px 4px 0;
  font-size: 0.9rem;
}

.auth-info--guest {
  background: #fff3e0;
  border-left-color: #ff9800;
}
</style>
