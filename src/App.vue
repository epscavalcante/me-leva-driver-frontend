<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import { RouterView } from 'vue-router'
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogRoot,
} from 'radix-vue'
import { usePermission } from '@vueuse/core'
import { computed } from 'vue'

const geolocationPermission = usePermission('geolocation')

const isGeolocationGranted = computed(() =>
  ['granted', 'prompt'].includes(geolocationPermission.value as string),
)

function reloadPage() {
  window.location.reload()
}
</script>

<template>
  <section class="flex h-screen bg-gray-200">
    <nav class="bg-gray-300 flex flex-col justify-between items-center py-7 my-auto h-screen">
      <h1 class="text-center font-black text-3xl px-4">
        Me <br />Leva <br />
        <small class="text-[10px]">--Motorista--</small>
      </h1>

      <div class="flex flex-col items-center justify-center gap-4">
        <RouterLink
          :to="{ name: 'home' }"
          class="font-bold flex flex-col items-center gap-1"
          aria-current="page"
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
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>

          <small>Home</small>
        </RouterLink>

        <RouterLink :to="{ name: 'rides' }" class="font-bold flex flex-col items-center gap-1">
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
              d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
            />
          </svg>

          <small>Rides</small>
        </RouterLink>

        <RouterLink :to="{ name: 'account' }" class="font-bold flex flex-col items-center gap-1">
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
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <small>Account</small>
        </RouterLink>
      </div>

      <button class="flex items-center flex-col gap-1.5">
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
            d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
          />
        </svg>

        <small class="font-bold">Logout</small>
      </button>
    </nav>

    <main v-if="isGeolocationGranted" class="py-10 w-full overflow-auto">
      <section class="container mx-auto px-5 xl:px-0">
        <RouterView />
      </section>
    </main>
  </section>

  <DialogRoot :open="!isGeolocationGranted">
    <DialogPortal>
      <DialogOverlay class="bg-black/90 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="m-0 text-[17px] font-semibold mb-20">Permissão obrigatória</DialogTitle>
        <div class="w-full flex-col justify-center items-center gap-32">
          <img src="@/assets/current-location.svg" alt="" class="max-w-3xs mx-auto" />
          <div class="max-w-lg text-center mx-auto">
            <DialogDescription class="my-10">
              <p class="text-xl font-medium mb-10">
                Ative a localização do seu dispositivo para que tudo funcione conforme esperado!
              </p>
            </DialogDescription>
            <button
              class="mb-10 md:mb-5 bg-gray-400 px-8 py-4 rounded-2xl font-medium hover:bg-gray-500 cursor-pointer"
              @click="reloadPage"
            >
              Por favor, recarregue a página
            </button>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>

  <Toaster />
</template>

<style scoped>
html.dark {
  color-scheme: dark;
}
body {
  @apply bg-[#FFF3E2] text-[#342B1D];
}
</style>
