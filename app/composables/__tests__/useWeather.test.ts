import { describe, it, expect, vi, beforeEach } from "vitest";
import { useWeather } from "../useWeather";
import type { WeatherResultMapping } from "../../../types/weather";
import type { $Fetch } from "ofetch";

describe("useWeather composable", () => {
  let composable: ReturnType<typeof useWeather>;

  const mockResponses: Record<string, WeatherResultMapping> = {
    London: {
      city: "London",
      weather: "Clear sky",
      temperature: 20,
      feels_like: 21,
      humidity: 50,
      temp_min: 18,
      temp_max: 22,
      wind_speed: 5,
      rain: 0,
    },

    Rugby: {
      city: "Rugby",
      weather: "Rainy",
      temperature: 15,
      feels_like: 14,
      humidity: 70,
      temp_min: 12,
      temp_max: 16,
      wind_speed: 7,
      rain: 2,
    },
  };

  beforeEach(() => {
    // Reset before each test
    composable = useWeather();
    const mockFetch = vi.fn() as unknown as $Fetch;
    // Mock $fetch globally
    (global.$fetch as any) = vi.fn((url: string) => {
      const city = url.split("/").pop(); // get city from /api/weather/{city}
      const data = mockResponses[city!];

      if (!data) {
        return Promise.reject({ data: { statusMessage: "City not found" } });
      }

      return Promise.resolve(data);
    }) as any;
  });

  it("fetches weather for LONDON successfully", async () => {
    const mockResponse: WeatherResultMapping = {
      city: "London",
      weather: "Clear sky",
      temperature: 20,
      feels_like: 21,
      humidity: 50,
      temp_min: 18,
      temp_max: 22,
      wind_speed: 5,
      rain: 0,
    };

    await composable.fetchWeather("/api/weather/London");
    console.log(composable.weatherData.value);
    expect(composable.weatherData.value).toEqual(mockResponse);
    expect(composable.error.value).toBeNull();
    expect(composable.loading.value).toBe(false);
  });

  it("handles fetch errors", async () => {
    (global.$fetch as any).mockRejectedValue({
      data: { statusMessage: "City not found" },
    });

    await composable.fetchWeather("/api/weather/InvalidCity");

    expect(composable.weatherData.value).toBeNull();

    expect(composable.error.value).toBe("City not found");
    expect(composable.loading.value).toBe(false);
  });

  it("fetches weather for RUGBY successfully", async () => {
    const mockResponse: WeatherResultMapping = {
      city: "Rugby",
      weather: "Rainy",
      temperature: 15,
      feels_like: 14,
      humidity: 70,
      temp_min: 12,
      temp_max: 16,
      wind_speed: 7,
      rain: 2,
    };

    await composable.fetchWeather("/api/weather/Rugby");
    console.log(composable.weatherData.value);

    expect(composable.weatherData.value).toEqual(mockResponse);
    expect(composable.error.value).toBeNull();
    expect(composable.loading.value).toBe(false);
  });

  it("fetches weather unsuccessfully", async () => {
    await composable.fetchWeather("/api/weather/Lagos");
    console.log(composable.weatherData.value);

    expect(composable.error.value).toEqual("City not found");
    expect(composable.loading.value).toBe(false);
  });
});
