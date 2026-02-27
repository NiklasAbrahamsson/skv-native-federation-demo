<script setup lang="ts">
import { useRoute } from 'vue-router';

/**
 * Details page -- mirrors the Angular and React sub-apps' details pages.
 *
 * Reads the :id route parameter via Vue Router's useRoute() composable,
 * similar to how the Angular version uses input.required<string>()
 * with withComponentInputBinding() and the React version uses useParams().
 */
const route = useRoute();
const id = route.params.id as string;
</script>

<template>
  <div class="details">
    <router-link to="/" class="back-link">Back to dashboard</router-link>

    <h1>Details for Item {{ id }}</h1>
    <p class="badge">Vue micro frontend — child route</p>

    <div class="detail-card">
      <p>
        This page demonstrates that the Vue sub-app manages its own child
        routes internally using Vue Router. The URL
        is <code>/sub-app-vue/details/{{ id }}</code> — the shell's Angular
        Router delegates everything under <code>/sub-app-vue</code> to this
        remote's Custom Element, and Vue Router handles the rest.
      </p>
      <p>
        The route parameter <code>:id</code> is read via Vue
        Router's <code>useRoute()</code> composable — the Vue equivalent of
        Angular's <code>input.required()</code> with route binding, or React
        Router's <code>useParams()</code> hook.
      </p>
    </div>
  </div>
</template>

<style scoped>
.details {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.details h1 {
  font-size: 1.8rem;
  margin-bottom: 0.25rem;
  color: #1a1a2e;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #1a1a2e;
  font-size: 0.9rem;
  text-decoration: none;
}

.back-link::before {
  content: '\2190  ';
}

.back-link:hover {
  text-decoration: underline;
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

.detail-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
}

.detail-card p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 1rem;
}

.detail-card p:last-child {
  margin-bottom: 0;
}

.detail-card code {
  background: #f0f0f0;
  padding: 0.1em 0.35em;
  border-radius: 3px;
  font-size: 0.9em;
}
</style>
