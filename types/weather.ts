export interface OpenWeatherResponse {
  name: string;
  weather: { description: string }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  wind: { speed: number };
  rain?: { "1h"?: number };
}
export interface WeatherResultMapping {
      city: string;
      weather: string;
      temperature: number;
      feels_like: number;
      humidity: number;
      temp_min: number;
      temp_max: number;
      wind_speed:  number;
      rain: number;
}
