<template>
  <main class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-3xl px-4 py-8">
      <!-- Page title -->
      <header class="mb-8 border-b pb-4">
        <h1 class="text-3xl font-bold">How This APP Came To Be</h1>
        <p class="mt-2 text-sm text-gray-600">
          Overview of the requirements for the weather application.
        </p>
      </header>

      <!-- Exercise description -->
      <section class="mb-10 space-y-4">
        <p class="text-gray-800 leading-relaxed">
          Build an application that takes the name of a city in the UK and
          provides the current weather information for that city using the Open
          Weather Map API.
        </p>

        <p class="text-gray-800 leading-relaxed">
          You will need to register for a free account to retrieve an API key –
          please provide this API key in your usage instructions.
        </p>

        <p class="text-gray-800 leading-relaxed">
          We use React, Vue or Nuxt on our suite of products, but please use a
          framework you’re comfortable with.
        </p>
      </section>

      <!-- Functional requirements -->
      <section class="mb-10">
        <h2 class="text-2xl font-semibold mb-4">Functional requirements</h2>

        <ul class="list-disc space-y-2 pl-6 text-gray-800">
          <li>
            The user must be able to search for cities from both the home screen
            and the weather results screen.
          </li>
          <li>Incorrect city names must be handled.</li>
          <li>
            The following information must be displayed:
            <ul class="mt-2 list-disc space-y-1 pl-6">
              <li>Current weather conditions.</li>
              <li>The current temperature, in celsius.</li>
              <li>“Feels like” temperature, in celsius.</li>
              <li>Humidity percentage.</li>
              <li>Minimum temperature, in celsius.</li>
              <li>Maximum temperature, in celsius.</li>
              <li>Wind speed, in miles per hour.</li>
              <li>Rain volume for the last hour, in millimeters.</li>
            </ul>
          </li>
          <li>
            If the application is to support countries outside of the UK it must
            be clear which are supported and the user must be able to select the
            appropriate country.
          </li>
        </ul>
      </section>

      <!-- Non-functional requirements -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Non-functional requirements</h2>

        <ul class="list-disc space-y-2 pl-6 text-gray-800">
          <li>
            The code must be provided in a git repository, with commits made
            regularly. We like seeing the steps you went through to get to the
            finish.
          </li>
          <li>
            You must provide setup and usage instructions for running the
            application on a local machine.
          </li>
          <li>
            We recommend you do not spend longer than 3 hours on this exercise.
          </li>
          <li>We would love to see some tests.</li>
        </ul>
      </section>

      <!-- Optional note at bottom -->
      <footer class="mt-10 border-t pt-4 text-xs text-gray-500">
        Only UK cities are supported for now. Other countries will be added in
        the next version.
      </footer>
    </div>
  </main>
</template>
