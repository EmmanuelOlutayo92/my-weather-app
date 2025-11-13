
export interface WeatherResponse {
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

