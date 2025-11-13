export default defineEventHandler(async (event) => {
  const { city } = event.context.params as { city: string };
  const config = useRuntimeConfig();
  interface WeatherResponse {
    name: string;
    weather: { description: string }[];
    main: {
      temprature: number;
      feels_like: number;
      humidity: number;
      temp_min: number;
      temp_max: number;      
    };
    wind: { speed: number };
    rain?: { "1h"?: number };
  }

  try {
    const url = `${config.openWeather.baseAddress}/weather?q=${encodeURIComponent(
      city
    )},GB&appid=${config.openWeather.apiKey}&units=metric`;

    const response = await $fetch<WeatherResponse>(url);

    return {
      city: response.name,
      weather: response.weather[0].description,
      temperature: response.main.temprature,
      feels_like: response.main.feels_like,
      humidity: response.main.humidity,
      temp_min: response.main.temp_min,
      temp_max: response.main.temp_max,
      wind_speed: response.wind.speed,
      rain: response.rain?.["1h"] || 0,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 404,
      statusMessage: "City not found or invalid.",
    });
  }
});