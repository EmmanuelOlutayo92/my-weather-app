<script setup lang="ts">

import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { watch } from 'vue'

const route = useRoute()
const router = useRouter()

const cityParam = computed(() => decodeURIComponent(String(route.params.city || '')))


const { weatherData, loading, error, fetchWeather } = useWeather()

// Fetch when page loads or when params change
watch(
  () => [cityParam.value],
  ([city]) => {
    if (city) {
      fetchWeather(city)
    }
  },
  { immediate: true }
)

const handleSearch = ({ city}: { city: string; }) => {
  const trimmedCity = city.trim()
  if (!trimmedCity) return

  router.push({
    name: 'weather-city',
    params: { city: encodeURIComponent(trimmedCity) }
  })
}
</script>


<template>
  <main class="page">
    <section class="card">
      <header class="header">
        <div>
          <h1 class="title">Weather results</h1>
          <NuxtLink to="/" class="back-link">← Back to home</NuxtLink>
        </div>
      </header>

      <!-- Search form on the results page -->
      <WeatherSearchForm
        :initial-city="cityParam"
        @submit="handleSearch"
      />

      <section class="content">
        <p v-if="loading">Loading weather…</p>
        <p v-if="error && !loading" class="error">{{ error }}</p>

        <section v-if="weatherData && !loading && !error" class="result">
          <h2 class="location">
            {{ weatherData.name }}
          </h2>
          <p class="description">
            {{ weatherData.weather }}
          </p>

          <div class="grid">
            <div class="item">
              <span class="label">Temperature</span>
              <span class="value">{{ weatherData.temperature }}°C</span>
            </div>

            <div class="item">
              <span class="label">Feels like</span>
              <span class="value">{{ weatherData.feels_like }}°C</span>
            </div>

            <div class="item">
              <span class="label">Humidity</span>
              <span class="value">{{ weatherData.humidity }}%</span>
            </div>

            <div class="item">
              <span class="label">Min / Max</span>
              <span class="value">
                {{ weatherData.temp_min }}°C / {{ weatherData.temp_max }}°C
              </span>
            </div>

            <div class="item">
              <span class="label">Wind speed</span>
              <span class="value">{{ weatherData.wind_speed }} mph</span>
            </div>

            <div class="item">
              <span class="label">Rain (last hour)</span>
              <span class="value">{{ weatherData.rain }} mm</span>
            </div>
          </div>
        </section>
      </section>
    </section>
  </main>
</template>


<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  background: #020617;
  color: #e5e7eb;
}

.card {
  width: 100%;
  max-width: 900px;
  background: #020617;
  border-radius: 1rem;
  padding: 1.75rem;
  border: 1px solid rgba(148, 163, 184, 0.4);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.5rem;
}

.back-link {
  font-size: 0.85rem;
  color: #38bdf8;
}

.content {
  margin-top: 1.25rem;
}

.error {
  margin-top: 1rem;
  color: #fca5a5;
}

.result {
  margin-top: 1.5rem;
}

.location {
  font-size: 1.3rem;
  margin-bottom: 0.25rem;
}

.description {
  text-transform: capitalize;
  color: #e5e7eb;
  margin-bottom: 1.25rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.75rem;
}

.item {
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.35);
}

.label {
  font-size: 0.75rem;
  color: #9ca3af;
}

.value {
  display: block;
  font-size: 1rem;
  font-weight: 600;
}
</style>