<script setup lang="ts">
import LineSkeleton from './LineSkeleton.vue'
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left">
      <thead class="text-xs text-gray-700 uppercase bg-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Origem X Destino</th>
          <th scope="col" class="px-6 py-3 w-40">
            <div class="flex items-center">Status</div>
          </th>
          <th scope="col" class="px-6 py-3 w-40">
            <div class="flex items-center">Distância</div>
          </th>
          <th scope="col" class="px-6 py-3 w-40">
            <div class="flex items-center">Preço</div>
          </th>
          <th scope="col" class="px-6 py-3 w-40">
            <div class="flex items-center">Solictado em</div>
          </th>
          <th scope="col" class="px-6 py-3 w-40">
            <div class="flex items-center">Motorista</div>
          </th>
          <th scope="col" class="px-6 py-3 w-20">
            <span class="sr-only"></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i of 4" :key="i" class="bg-gray-300">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900">
            <LineSkeleton />
            <br />
            <LineSkeleton />
          </th>
          <td class="px-6 py-4">
            <LineSkeleton />
          </td>
          <td class="px-6 py-4">
            <LineSkeleton />
          </td>
          <td class="px-6 py-4">
            <LineSkeleton />
          </td>
          <td class="px-6 py-4">
            <LineSkeleton />
          </td>
          <td class="px-6 py-4">
            <LineSkeleton />
          </td>
          <td class="px-6 py-4 flex justify-center">
            <LineSkeleton />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
