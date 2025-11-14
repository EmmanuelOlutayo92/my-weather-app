<script setup lang="ts">
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { watch } from "vue";

const route = useRoute();
const router = useRouter();

const cityParam = computed(() =>
  decodeURIComponent(String(route.params.city || ""))
);

const { weatherData, loading, error, fetchWeather } = useWeather();

// Fetch when page loads or when params change
watch(
  () => [cityParam.value],
  ([city]) => {
    if (city) {
      fetchWeather(city);
    }
  },
  { immediate: true }
);

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
  <main class="min-h-screen bg-slate-950 py-8">
    <UContainer>
      <UCard class="max-w-4xl mx-auto">
        <template #header>
          <div class="flex items-center justify-between gap-4">
            <div>
              <h1 class="text-xl font-semibold">Weather Results</h1>
              <p class="text-sm text-gray-400">
                View Weather conditions for your chosen city
              </p>
            </div>

            <UButton
              variant="ghost"
              color="gray"
              size="sm"
              icon="i-heroicons-arrow-left"
              to="/"
            >
              Back To Home
            </UButton>
          </div>
        </template>

        <div class="space-y-6">
          <!-- Search form on the results page -->
          <WeatherSearchForm :initial-city="cityParam" @submit="handleSearch" />

          <section class="content">
            <div v-if="loading">
              <UProgress color="secondary" />
            </div>
            <div v-if="error && !loading">
              <UAlert
                color="red"
                variant="soft"
                icon="i-heroicons-exclamation-triangle"
                title="Something went wrong"
                :description="error"
              />
            </div>

            <section v-if="weatherData && !loading && !error" class="space-y-4">
              <h2 class="location">
                {{ weatherData.city }}
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
        </div>
      </UCard>
    </UContainer>
  </main>
</template>

<style scoped>
.content {
  margin-top: 1.25rem;
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
