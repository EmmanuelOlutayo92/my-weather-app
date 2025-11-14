// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig:{
    openWeather:{
      apiKey: process.env.OPENWEATHER_API_KEY , // This is automatically updated by nuxt through the .env file using the key OPENWEATHER_API_KEY
      baseAddress: process.env.OPENWEATHER_BASE_ADDRESS , // This is automatically updated by nuxt through the .env file using the key OPENWEATHER_BASE_ADDRESS
    },

    public:{
      baseAddress: process.env.OPENWEATHER_BASE_ADDRESS // This is automatically updated by nuxt through the .env file using the key OPENWEATHER_BASE_ADDRESS
    }
    
  }
})
