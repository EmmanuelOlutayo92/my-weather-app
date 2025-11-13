import { useNuxtApp } from "nuxt/app";
import type { WeatherResponse } from "../types/weather";
import { ref } from "vue";

export const useWeather = () => {
    const weatherData = ref<WeatherResponse|null>(null);
    const error = ref(null);
    const loading = ref(false);

    const fetchWeather = async (city: string) => {
        loading.value = true;
        error.value = null;

        try {
            weatherData.value  = await $fetch<WeatherResponse>(`/api/weather/${city}`);
        
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

