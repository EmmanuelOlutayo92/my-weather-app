# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

````bash
# npm
npm install

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
````

## Production

Build the application for production:

````bash
# npm
npm run build


Locally preview production build:

```bash
# npm
npm run preview

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
````

## Instructions To Run The Application

1. Install Dependencies
   a. If you haven’t already, download and install Node.js on your device.
   b. Verify that Node is installed by running: node -v
   c. Install npm packages by running: npm install
   d. Navigate to the project folder using: cd
2. Set Up Environment Variables
   a. Create a .env file in the project root.
   b. Add: OPEN_WEATHER_API_KEY=your_api_key_here
3. Run the Nuxt Application
   a. Start the development server: npm run dev
   b. Open your browser at http://localhost:3000
4. Run Unit Tests
   Run: npm run test
5. Using the Application
   a. Enter a UK city name.
   b. Click Search.
   c. You will be redirected to the results page.
   d. The page displays: - Current weather conditions - Temperature (°C) - Feels like (°C) - Humidity (%) - Min/Max temperature (°C) - Wind speed (mph) - Rain volume in the last hour (mm)
   e. The app currently supports only UK cities, with more countries coming soon.
