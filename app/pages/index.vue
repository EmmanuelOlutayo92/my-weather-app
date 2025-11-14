<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const handleSearch = ({ city }: { city: string }) => {
  const trimmedCity = city.trim();

  if (!trimmedCity) return;

  router.push({
    name: "weather-city",
    params: { city: encodeURIComponent(trimmedCity) },
  });
};
</script>

<template>
  <main class="page">
    <section class="card">
      <h1 class="title">Weather Checker</h1>
      <p class="subtitle">Enter a UK city to get the current weather.</p>

      <WeatherSearchForm @submit="handleSearch" />
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  color: #f9fafb;
  padding: 1.5rem;
}

.card {
  width: 100%;
  max-width: 720px;
  background: #020617;
  border-radius: 1rem;
  padding: 1.75rem;
  border: 1px solid rgba(148, 163, 184, 0.4);
}

.title {
  font-size: 1.7rem;
  margin-bottom: 0.25rem;
}

.subtitle {
  font-size: 0.9rem;
  color: #9ca3af;
  margin-bottom: 1.25rem;
}
</style>
