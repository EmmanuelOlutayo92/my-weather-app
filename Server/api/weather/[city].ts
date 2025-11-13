import type { WeatherResponse } from "../../../types/weather";

export default defineEventHandler(async (event) => {
  console.log("✅ This is running on the server");
  const { city } = event.context.params as { city: string };
  const config = useRuntimeConfig();
  console.log(config.openWeather.apiKey)
  console.log(config.openWeather.baseAddress)

  try {
    
    const url = `${config.openWeather.baseAddress}/weather?q=${encodeURIComponent(
      city
    )},GB&appid=${config.openWeather.apiKey}&units=metric`;
    //console.log(url)
    const response = await $fetch<WeatherResponse>(url);
    //console.log(response)
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
      // Handle invalid city names gracefully
      statusCode: 404,
      statusMessage: "City not found or invalid.",
    });
  }
});