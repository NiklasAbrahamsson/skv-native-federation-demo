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
    <p class="badge vue-badge">Vue micro frontend -- child route</p>

    <div class="detail-card">
      <p>
        This page demonstrates that the Vue sub-app manages its own child
        routes internally using Vue Router. The URL
        is <code>/sub-app-vue/details/{{ id }}</code> -- the shell's Angular
        Router delegates everything under <code>/sub-app-vue</code> to this
        remote's Custom Element, and Vue Router handles the rest.
      </p>
      <p>
        The route parameter <code>:id</code> is read via Vue
        Router's <code>useRoute()</code> composable -- the Vue equivalent of
        Angular's <code>input.required()</code> with route binding, or React
        Router's <code>useParams()</code> hook.
      </p>
    </div>
  </div>
</template>

<style scoped>
.details {
  max-width: 800px;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #42b883;
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
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

.detail-card {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1.25rem;
  border: 1px solid #e0e0e0;
}

.detail-card p {
  margin: 0 0 0.75rem;
  line-height: 1.6;
}

.detail-card p:last-child {
  margin-bottom: 0;
}

.detail-card code {
  background: #e8e8e8;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.9em;
}
</style>
