import type { WeatherResultMapping } from "../../types/weather";
import { ref } from "vue";

export const useWeather = () => {
  const weatherData = ref<WeatherResultMapping | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const fetchWeather = async (city: string) => {
    const trimmedCity = city.trim();
    loading.value = true;
    error.value = null;

    if (!trimmedCity) {
      error.value = "Please enter a city name.";
      weatherData.value = null;
      return;
    }
    try {
      weatherData.value = await $fetch<WeatherResultMapping>(
        `/api/weather/${city}`
      );
    } catch (err: any) {
      error.value = err?.data?.statusMessage || "Unable to fetch weather data.";
      weatherData.value = null;
    } finally {
      loading.value = false;
    }
  };
  return {
    weatherData,
    error,
    loading,
    fetchWeather,
  };
};
