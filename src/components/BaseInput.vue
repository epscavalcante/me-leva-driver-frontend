<template>
  <div class="flex flex-col w-full">
    <label v-if="label" :for="name" class="block mb-2 text-sm font-medium text-gray-900">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      v-model="value"
      :id="name"
      :placeholder="label"
      class="border h-10 border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-500 block w-full p-2.5"
    />
  </div>
</template>

<script setup lang="ts">
type Props = {
  label?: string
  name: string
  modelValue?: string | number | null
}

defineProps<Props>()

const value = defineModel()
</script>

<style></style>
