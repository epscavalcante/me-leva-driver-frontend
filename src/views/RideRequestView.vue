<script setup lang="ts">
import { computed, inject, onBeforeMount, ref } from 'vue'
import TheMapping from '@/components/TheMapping.vue'
import {
  DialogContent,
  DialogOverlay,
  DialogDescription,
  DialogPortal,
  DialogTitle,
  DialogRoot,
} from 'radix-vue'
import Utils from '@/utils'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'
import { rideGatewayInjectionKey } from '@/config/app/injectionKeys'

const router = useRouter()
const rideGateway = inject(rideGatewayInjectionKey)

const formInput = ref({
  fromLatitude: -15.597,
  fromLongitude: -56.0958,
  toLatitude: -15.57627,
  toLongitude: -56.07371,
})

const isRideSimulationDialogOpened = ref(false)
const isRideSimulationLoading = ref(true)

const directions = computed(() => {
  const pos = [
    [-56.095937, -15.596888],
    [-56.09627, -15.59728],
    [-56.097639, -15.596066],
    [-56.094339, -15.591445],
    [-56.092414, -15.59304],
    [-56.091393, -15.59214],
    [-56.089919, -15.591647],
    [-56.088884, -15.590789],
    [-56.084765, -15.589284],
    [-56.083665, -15.588647],
    [-56.077098, -15.581778],
    [-56.076704, -15.580832],
    [-56.076354, -15.579036],
    [-56.073736, -15.575879],
    [-56.073521, -15.576152],
  ]
  return pos.map((p) => ({ latitude: p[1], longitude: p[0] }))
})

async function openRideSimulation() {
  isRideSimulationDialogOpened.value = true
  await Utils.sleep(2000)
  isRideSimulationLoading.value = false
}

function cancelSimulation() {
  isRideSimulationDialogOpened.value = false
  isRideSimulationLoading.value = true
}

async function requestRide() {
  const requestRideResponse = await rideGateway?.requestRide({
    passengerId: '6f9c9375-5671-3bbe-a412-dfae3a423061',
    ...formInput.value,
  })

  await router.push({
    name: 'rides.detail',
    params: { rideId: requestRideResponse.rideId },
  })
}
</script>

<template>
  <section
    class="bg-gray-300 flex flex-col lg:flex-row w-full items-center justify-center gap-10 rounded-lg mb-10 p-4"
  >
    <img
      src="@/assets/location-search.svg"
      alt=""
      class="max-w-2xs md:max-w-96 lg:max-w-lg w-full"
    />

    <form class="rounded-lg max-w-[450px]">
      <h3 class="text-3xl mb-5 font-bold">Request a Ride</h3>

      <h4 class="font-bold mb-3">Pickup location</h4>

      <div class="flex gap-4">
        <BaseInput v-model="formInput.fromLatitude" label="From latitude" name="from_latitude" />
        <BaseInput v-model="formInput.fromLongitude" label="From longitude" name="from_longitude" />
      </div>

      <br />

      <h4 class="font-bold mb-3">Where to</h4>
      <div class="flex gap-4">
        <BaseInput v-model="formInput.toLatitude" label="To latitude" name="to_latitude" />
        <BaseInput v-model="formInput.toLongitude" label="To longitude" name="to_longitude" />
      </div>

      <br />

      <button
        type="button"
        class="bg-gray-500 w-full px-4 py-5 rounded-lg font-medium cursor-pointer"
        @click="openRideSimulation"
      >
        Request ride
      </button>
    </form>
  </section>

  <DialogRoot :open="isRideSimulationDialogOpened">
    <DialogPortal>
      <DialogOverlay class="bg-black/90 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
      <DialogContent
        class="data-[state=open]:animate-contentShow h-fit fixed top-[50%] left-[50%] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-5 focus:outline-none z-[100]"
      >
        <DialogTitle class="m-0 text-xl font-semibold mb-10">Ride simulation</DialogTitle>

        <DialogDescription class="">
          <template v-if="isRideSimulationLoading">
            <section class="flex items-center justify-between gap-4">
              <div role="status" class="h-20 animate-pulse w-full">
                <div class="h-14 bg-gray-400 rounded-lg"></div>
              </div>

              <div role="status" class="h-20 animate-pulse w-full">
                <div class="h-14 bg-gray-400 rounded-lg"></div>
              </div>
            </section>
          </template>

          <template v-else>
            <section class="flex items-center justify-between gap-4">
              <div role="status" class="h-20 animate-pulse w-full">
                <div class="h-14 bg-gray-400 rounded-lg"></div>
              </div>

              <div role="status" class="h-20 animate-pulse w-full">
                <div class="h-14 bg-gray-400 rounded-lg"></div>
              </div>
            </section>
          </template>
        </DialogDescription>

        <section class="h-96">
          <div
            v-if="isRideSimulationLoading"
            role="status"
            class="h-full animate-pulse w-full bg-gray-400 rounded-lg"
          ></div>
          <TheMapping
            v-else
            :current-position="{ latitude: -15.596888, longitude: -56.095937 }"
            :end-position="{ latitude: -15.576152, longitude: -56.073521 }"
            :routing="directions"
            class="h-full"
          />
        </section>

        <button
          type="button"
          class="bg-gray-500 w-full px-4 py-5 rounded-lg font-medium cursor-pointer mt-5"
          @click="requestRide"
        >
          Confirm, Request ride
        </button>

        <button
          type="button"
          class="bg-white border border-gray-50 w-full px-4 py-5 rounded-lg font-medium cursor-pointer mt-5"
          @click="cancelSimulation"
        >
          Cancel
        </button>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style></style>
