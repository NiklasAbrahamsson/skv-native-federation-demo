<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';
import type { UserData } from './types';

// Props are set during initial mount. For reactive updates from
// the custom element's attributeChangedCallback, we use injected refs.
defineProps<{
  userData: UserData | null;
  basePath: string;
}>();

// Injected reactive refs from the custom element wrapper.
// Falls back to prop values when running standalone.
const injectedUserData = inject<Ref<UserData | null>>('userData');

const currentUser = computed(() =>
  injectedUserData ? injectedUserData.value : null
);
const isAuthenticated = computed(() => currentUser.value !== null);
</script>

<template>
  <router-view />
</template>
