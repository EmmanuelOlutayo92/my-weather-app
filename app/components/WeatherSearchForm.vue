<script setup lang="ts">
import { ref, watch } from "vue";
import type { DropdownMenuItem } from "@nuxt/ui";

const props = defineProps<{
  initialCity?: string;
  initialCountry?: string;
}>();

const emit = defineEmits<{
  (e: "submit", payload: { city: string; country: string }): void;
}>();

const city = ref(props.initialCity ?? "");
const country = ref(props.initialCountry ?? "GB");

const onSubmit = () => {
  emit("submit", {
    city: city.value,
    country: country.value,
  });
};

const items = ref<DropdownMenuItem[]>([
  {
    label: "United Kingdom (GB)",
    value: "GB",
    onSelect: () => {
      country.value = "GB";
      countryLabel.value = "United Kingdom (GB)";
    },
  },
  {
    label: "Ireland (IE)",
    value: "IE",
    onSelect: () => {
      country.value = "IE";
      countryLabel.value = "Ireland (IE)";
    },
  },
  {
    label: "United States (US)",
    value: "US",
    onSelect: () => {
      country.value = "US";
      countryLabel.value = "United States (US)";
    },
  },
  {
    label: "France (FR)",
    value: "FR",
    onSelect: () => {
      country.value = "FR";
      countryLabel.value = "France (FR)";
    },
  },
]);
const selectedLabel = computed(
  () => items.value.find((i) => i.value === country.value).label || "Country"
);

console.log(city.value);
console.log(country.value);

watch(country, (val) => {
  console.log("COUNTRY CHANGED:", val);
  console.log("LABEL NOW:", selectedLabel.value);
});
</script>

<template>
  <UForm @submit.prevent="onSubmit">
    <div class="ws-form-grid">
      <UFormField label="City" name="city" class="ws-label" />
      <UInput
        id="city"
        v-model="city"
        type="text"
        placeholder="e.g. London, Manchester, Rugby"
        size="lg"
        class="ws-input"
      />
      <UDropdownMenu
        :items="items"
        :content="{
          align: 'start',
          side: 'bottom',
          sideOffset: 8,
        }"
        :ui="{
          content: 'w-48',
        }"
      >
        <UButton
          :label="selectedLabel"
          icon="i-lucide-menu"
          color="neutral"
          variant="outline"
        />
      </UDropdownMenu>

      <UButton
        type="submit"
        size="lg"
        color="primary"
        variant="solid"
        icon="i-heroicons-magnifying-glass-20-solid"
        class="ws-button"
      >
        Search
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>
.ws-form-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr;
}
@media (min-width: 640px) {
  .ws-form-grid {
    grid-template-columns: 1fr auto;
  }
}
.ws-label {
  grid-column: 1 / -1;
  font-size: 0.8rem;
  color: #6b7280;
}
.ws-button,
.ws-input {
  height: 48px !important; /* matches UInput size="lg" */
  display: flex;
  align-items: center;
}
@media (min-width: 640px) {
  .ws-button {
    width: 100%;
  }
}
</style>
