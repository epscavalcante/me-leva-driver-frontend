<script setup lang="ts">
import { computed } from 'vue'
import { useGeolocation } from '@vueuse/core'
import TheMapping from './TheMapping.vue'

const { coords, error } = useGeolocation()

const currentPosition = computed(() => {
  if (error.value) return null
  const { latitude, longitude } = coords.value
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null
  return {
    latitude,
    longitude,
  }
})
</script>

<template>
  <section class="mb-10 rounded-2xl p-10 min-h-[400px] h-full">
    <TheMapping v-if="!error && currentPosition" :current-position="currentPosition" class="" />

    <div v-if="error">
      <div class="w-full flex flex-col md:flex-row justify-center items-center gap-10">
        <img src="@/assets/current-location.svg" alt="" class="max-w-3xs" />
        <div class="max-w-[400px] text-center md:text-left">
          <p class="text-xl font-medium">
            Ative a localização do seu dispositivo para que tudo funcione conforme esperado!
          </p>
          <!--<button class="mb-10 md:mb-5">Por favor, recarregue a página</button>-->
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
