import type { WeatherResponse } from "../../../types/weather";

export default defineEventHandler(async (event) => {
  const { city } = event.context.params as { city: string };
  const config = useRuntimeConfig();
  const {apiKey, baseAddress} = config.openWeather
  
  console.log(apiKey)
  console.log(baseAddress)
  
  if(!apiKey){
   throw createError({
      statusCode : 401,
      statusMessage: 'OpenWeather API key is not configured on the server. Unauthorised Access'
   })
  }
  if (!city?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'City name is required.',
    })
  }
  try {
    
    const url = `${config.openWeather.baseAddress}/weather?q=${encodeURIComponent(
      city
    )},GB&appid=${config.openWeather.apiKey}&units=metric`;
    const response = await $fetch<WeatherResponse>(url);

    const windSpeedMph = response.wind.speed * 2.2369362921
    return {
      city: response.name,
      weather: response.weather[0].description,
      temperature: response.main.temprature,
      feels_like: response.main.feels_like,
      humidity: response.main.humidity,
      temp_min: response.main.temp_min,
      temp_max: response.main.temp_max,
      wind_speed:  Number(windSpeedMph.toFixed(1)),
      rain: response.rain?.["1h"] || 0,
    };
  } catch (error: any) {
    const status = error?.statusCode || 500
    if(status == 404)
    throw createError({
      // Handle invalid city names gracefully
      statusCode: 404,
      statusMessage: `City: ${city} not found or invalid. `,
    });
  }
});