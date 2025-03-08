<script setup lang="ts">
import TableSkeleton from '@/components/TableSkeleton.vue'
import { inject, onMounted, ref, watch } from 'vue'
import Badge from '@/components/Badge.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { rideGatewayInjectionKey } from '@/config/app/injectionKeys'
import type { GetRidesOutput } from '@/gateways/RideGateway'

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)
const rides = ref<GetRidesOutput>({ total: 0, items: [] })
const filters = ref({
  page: 1,
  status: undefined,
  ...route.query,
})
const rideGateway = inject(rideGatewayInjectionKey)!

onMounted(() => getRides())

watch(
  filters,
  function () {
    getRides()
    router.push({
      query: filters.value,
    })
  },
  { deep: true },
)

async function getRides() {
  isLoading.value = true
  const getRidesResponse = await rideGateway.getRides(filters.value)
  rides.value.items = getRidesResponse.items
  rides.value.total = getRidesResponse.total
  isLoading.value = false
}
</script>

<template>
  <main>
    <section>
      <section class="flex justify-between items-center mb-10">
        <h1 class="text-4xl font-bold">Rides</h1>

        <RouterLink
          :to="{ name: 'rides.new' }"
          class="bg-gray-300 px-4 py-3 rounded-lg hover:bg-gray-400 font-medium"
        >
          Request ride
        </RouterLink>
      </section>
    </section>

    <section class="bg-gray-300 mb-5 rounded-2xl flex gap-4 p-4">
      <div class="flex flex-col max-w-2xs">
        <BaseSelect
          label="Ride status"
          name="rideStatus"
          v-model="filters.status"
          :options="['requested', 'accepted', 'completed']"
        />
      </div>
    </section>

    <TableSkeleton v-if="isLoading" />

    <div v-else class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
          <tr v-for="(item, index) of rides.items" :key="index" class="bg-gray-300">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900">
              Endereço de origem {{ item.fromLatitude }}
              {{ item.fromLongitude }}
              <br />
              Endereço destino {{ item.toLatitude }}
              {{ item.toLongitude }}
            </th>
            <td class="px-6 py-4">
              <Badge>{{ item.status }}</Badge>
            </td>
            <td class="px-6 py-4">
              {{ item.distance }}
            </td>
            <td class="px-6 py-4">
              {{ item.fare }}
            </td>
            <td class="px-6 py-4">
              {{ Date.now() }}
            </td>
            <td class="px-6 py-4">
              {{ item.driverName || '-' }}
            </td>
            <td class="px-6 py-4 flex justify-center">
              <RouterLink
                :to="{ name: 'rides.detail', params: { rideId: item.rideId } }"
                class="font-medium text-center text-blue-600 dark:text-blue-500 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style></style>
