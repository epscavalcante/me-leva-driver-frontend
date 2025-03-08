<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import type { GetRideDetailOutput } from '@/gateways/RideGateway'
import { toast } from 'vue-sonner'
import { echoInjectionKey, rideGatewayInjectionKey } from '@/config/app/injectionKeys'
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogRoot,
} from 'radix-vue'

const isLoading = ref(true)
const rideDetail = ref<GetRideDetailOutput | null>(null)
const isDialogRideDdetailOpened = ref(false)
const rideGateway = inject(rideGatewayInjectionKey)
const echo = inject(echoInjectionKey)

onMounted(async () => {
  // await getRideDetail(rideId)
  setupRideEventsForDriverId('')
})

async function getRideDetail(rideId: string) {
  isLoading.value = true
  const getRideDetailResponse = await rideGateway!.getRideDetail(rideId)
  rideDetail.value = getRideDetailResponse
  isLoading.value = false
}

function closeRideDetailDialog() {
  isDialogRideDdetailOpened.value = false
}

function openRideDetailDialog() {
  isDialogRideDdetailOpened.value = true
}

function setupRideEventsForDriverId(driverId: string) {
  console.log({ driverId })

  echo!.channel(`drivers`).listen('.RIDE.REQUESTED', function () {
    toast('ride requested')
    isDialogRideDdetailOpened.value = true
    //openRideDetailDialog()
  })
}
</script>

<template>
  <main class="flex flex-col gap-y-10">
    <section class="flex justify-between items-center">
      <h1 class="text-4xl font-bold">Hello, Driver!!</h1>
    </section>

    <img src="@/assets/searching.svg" alt="" class="max-w-3xl mx-auto" />
  </main>

  <DialogRoot :open="isDialogRideDdetailOpened">
    <DialogPortal>
      <DialogOverlay class="bg-black/90 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="m-0 text-[17px] font-semibold mb-20">Ride detail </DialogTitle>
        <div class="w-full flex-col justify-center items-center gap-32">
          <img src="@/assets/current-location.svg" alt="" class="max-w-3xs mx-auto" />

          <DialogDescription class="my-10">
            <h5 class="text-xl font-black mb-4">Nome do passageiro</h5>

            <div
              class="container max-w-2xl mx-auto relative border-l border-gray-200 dark:border-gray-700 ml-3"
            >
              <div class="ml-4">
                <div class="absolute left-0 w-4 h-4 border bg-white rounded-full my-3 -ml-2"></div>
                <div class="flex flex-col py-2">
                  <h3 class="tracking-tight font-semibold">Endereço de origem</h3>
                </div>
              </div>
              <div class="ml-4">
                <div class="absolute left-0 w-4 h-4 border bg-black rounded-full my-3 -ml-2"></div>
                <div class="flex flex-col py-2">
                  <h3 class="tracking-tight font-semibold">Endereço destino</h3>
                </div>
              </div>
            </div>
          </DialogDescription>

          <div class="max-w-lg text-center mx-auto">
            <div class="flex flex-col gap-y-2">
              <button
                class="bg-gray-400 px-8 py-4 rounded-2xl font-bold hover:bg-gray-500 cursor-pointer uppercase"
              >
                Accept ride
              </button>
              <button
                class="bg-gray-100 px-8 py-4 rounded-2xl font-medium hover:bg-gray-500 cursor-pointer"
                @click="closeRideDetailDialog"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style></style>
