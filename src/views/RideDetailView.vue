<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { GetRideDetailOutput } from '@/gateways/RideGateway'
import TheMapping from '@/components/TheMapping.vue'
import { toast } from 'vue-sonner'
import { echoInjectionKey, rideGatewayInjectionKey } from '@/config/app/injectionKeys'
const route = useRoute()
const isLoading = ref(true)
const rideDetail = ref<GetRideDetailOutput | null>(null)
const rideGateway = inject(rideGatewayInjectionKey)
const echo = inject(echoInjectionKey)

onMounted(async () => {
  const rideId = route.params.rideId as string
  await getRideDetail(rideId)
  setupRideEventsForRideId(rideId)
})

async function getRideDetail(rideId: string) {
  isLoading.value = true
  const getRideDetailResponse = await rideGateway!.getRideDetail(rideId)
  rideDetail.value = getRideDetailResponse
  isLoading.value = false
}

function setupRideEventsForRideId(rideId: string) {
  echo!
    .channel(`rides.${rideId}`)
    .listen('.RIDE.ACCEPTED', function () {
      toast('Ride accepted')
    })
    .listen('.RIDE.STARTED', function () {
      toast('Ride started')
    })
    .listen('.RIDE.POSITION_UPDATED', function () {
      toast('Ride Position updated')
    })
    .listen('.RIDE.COMPLETED', function () {
      toast('Ride finished')
    })
}
</script>

<template>
  <main>
    <section>
      <section class="flex justify-between items-center mb-10">
        <h1 class="text-4xl font-bold">Ride detail</h1>

        <RouterLink
          :to="{ name: 'rides' }"
          class="bg-gray-300 px-4 py-3 rounded-lg hover:bg-gray-400 font-medium"
        >
          Back
        </RouterLink>
      </section>
    </section>

    <section class="h-96">
      <div
        v-if="isLoading"
        role="status"
        class="h-full animate-pulse w-full bg-gray-400 rounded-lg"
      ></div>
      <TheMapping
        v-else
        :current-position="{
          latitude: rideDetail!.fromLatitude,
          longitude: rideDetail!.fromLongitude,
        }"
        :end-position="{
          latitude: rideDetail!.toLatitude,
          longitude: rideDetail!.toLongitude,
        }"
        class="h-full"
        :routing="
          rideDetail?.positions.map((item) => ({
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
          }))
        "
      />
    </section>

    <pre>{{ rideDetail }}</pre>
  </main>
</template>

<style></style>
