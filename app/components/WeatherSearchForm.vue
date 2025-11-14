<script setup lang="ts">

import { ref } from "vue";

const props = defineProps<{
  initialCity?: string
}>()

const emit = defineEmits<{
  (e: 'submit', payload: { city: string; }): void
}>()

const city = ref(props.initialCity ?? '')


const onSubmit = () => {
  emit('submit', {
    city: city.value
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="ws-form">
    <label class="ws-label" for="city">City</label>
    <input
      id="city"
      v-model="city"
      type="text"
      placeholder="e.g. London, Manchester, Rugby"
      class="ws-input"
    />
    <button type="submit" class="ws-button">
      Search
    </button>
  </form>
</template>



<style scoped>
.ws-form {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr 1fr auto;
  align-items: end;
}

.ws-label {
  grid-column: span 3;
  font-size: 0.8rem;
  color: #6b7280;
}

.ws-input {
  padding: 0.5rem 0.7rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 0.9rem;
}

.ws-button {
  padding: 0.55rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  background: #38bdf8;
  color: #0f172a;
  cursor: pointer;
}
</style>