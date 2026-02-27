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
    <p class="badge">Vue micro frontend</p>

    <section class="auth-status">
      <h2>Shared Auth State</h2>
      <div v-if="isAuthenticated" class="auth-card">
        <p class="status authenticated">Authenticated</p>
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
      <div v-else class="auth-card">
        <p class="status unauthenticated">Not authenticated</p>
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
  margin: 0 auto;
  padding: 2rem 1rem;
}

.dashboard h1 {
  font-size: 1.8rem;
  margin-bottom: 0.25rem;
  color: #1a1a2e;
}

.dashboard h2 {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: #333;
}

.badge {
  display: inline-block;
  background: #e8f5e9;
  color: #2e7d32;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.auth-status {
  margin-bottom: 2rem;
}

.auth-card {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
}

.status {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.status.authenticated {
  color: #2e7d32;
}

.status.unauthenticated {
  color: #c62828;
}

dl {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 0.4rem 1rem;
  margin-bottom: 1rem;
}

dt {
  font-weight: 500;
  color: #666;
  font-size: 0.9rem;
}

dd {
  margin: 0;
  font-size: 0.9rem;
}

.explanation {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.5;
  margin: 0;
}

.explanation code {
  background: #f0f0f0;
  padding: 0.1em 0.35em;
  border-radius: 3px;
  font-size: 0.9em;
}

.nav-demo {
  margin-bottom: 2rem;
}

.nav-demo p {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1rem;
}

.detail-links {
  display: flex;
  gap: 0.75rem;
}

.detail-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #2e7d32;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.detail-link:hover {
  background: #1b5e20;
}
</style>
