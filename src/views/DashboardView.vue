<script setup lang="ts">
import LatestRides from '@/components/HomeView/LatestRides.vue'
import Stats from '@/components/HomeView/Stats.vue'
</script>

<template>
  <main class="flex flex-col gap-y-10">
    <section class="flex justify-between items-center">
      <h1 class="text-4xl font-bold">Home</h1>
    </section>

    <Stats />

    <LatestRides />
  </main>
</template>

<style></style>
