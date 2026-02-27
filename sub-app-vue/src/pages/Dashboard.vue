<script setup lang="ts">
import { inject, computed, type Ref } from 'vue';
import type { UserData } from '../types';

// Reactive user data injected by the custom element wrapper.
// When running standalone, this will be undefined.
const userData = inject<Ref<UserData | null>>('userData');

const currentUser = computed(() => userData?.value ?? null);
const isAuthenticated = computed(() => currentUser.value !== null);
</script>

<template>
  <div class="dashboard">
    <h1>Sub-App Vue Dashboard</h1>
    <p class="badge vue-badge">Vue micro frontend</p>

    <section class="auth-status">
      <h2>Shared Auth State</h2>
      <div v-if="isAuthenticated" class="auth-card authenticated">
        <p class="status">Authenticated</p>
        <dl>
          <dt>Name</dt>
          <dd>{{ currentUser!.displayName }}</dd>
          <dt>Email</dt>
          <dd>{{ currentUser!.email }}</dd>
          <dt>Role</dt>
          <dd>{{ currentUser!.role }}</dd>
          <dt>ID</dt>
          <dd>{{ currentUser!.id }}</dd>
        </dl>
        <p class="explanation">
          This data comes from the Angular shell's <code>AuthService</code> in
          <code>@skv/shared</code>. The shell passes it to this Vue micro
          frontend via Custom Element attributes — bridging Angular signals
          to Vue reactive refs through the DOM.
        </p>
      </div>
      <div v-else class="auth-card unauthenticated">
        <p class="status">Not authenticated</p>
        <p class="explanation">
          Go back to the shell header and click <strong>Log in</strong>.
          Then return here — you'll see the user data appear without any
          reload, because the Angular <code>WrapperComponent</code> passes
          the auth state from the shared <code>AuthService</code> into this
          Vue app via element attributes.
        </p>
      </div>
    </section>

    <section class="nav-demo">
      <h2>Vue Internal Routing</h2>
      <p>
        This remote uses Vue Router for its own child routes, all rendered
        inside the Angular shell's <code>&lt;router-outlet&gt;</code>:
      </p>
      <div class="detail-links">
        <router-link to="/details/1" class="detail-link">View Item 1</router-link>
        <router-link to="/details/2" class="detail-link">View Item 2</router-link>
        <router-link to="/details/3" class="detail-link">View Item 3</router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 800px;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.vue-badge {
  background: #42b883;
  color: white;
}

.auth-status {
  margin-bottom: 2rem;
}

.auth-card {
  border-radius: 8px;
  padding: 1.25rem;
  margin-top: 0.75rem;
}

.auth-card.authenticated {
  background: #e8f5e9;
  border: 1px solid #a5d6a7;
}

.auth-card.unauthenticated {
  background: #fff3e0;
  border: 1px solid #ffcc80;
}

.status {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem 1rem;
  margin: 0.75rem 0;
}

dt {
  font-weight: 600;
  color: #555;
}

dd {
  margin: 0;
}

.explanation {
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.75rem;
}

.detail-links {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.detail-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background 0.2s;
}

.detail-link:hover {
  background: #369970;
}
</style>
