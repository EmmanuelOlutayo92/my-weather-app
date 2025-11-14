<!-- To DO Add NAV To Header  -->
<script setup lang="ts">
const items = ref([
  {
    label: "Home",
    icon: "i-lucide-house",
    to: "/",
  },
  {
    label: "About",
    icon: "i-lucide-book-open",
    to: "/about",
  },
]);
</script>

<template>
  <UNavigationMenu :items="items" class="w-full justify-center" />
</template>
