<template>
  <div class="flex flex-col w-full">
    <label v-if="label" :for="name" class="block mb-2 text-sm font-medium text-gray-900">
      {{ label }}
    </label>
    <select
      :name="name"
      :id="name"
      v-model="selectedValue"
      class="border h-10 border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-500 block w-full p-2.5"
    >
      <option
        v-for="(item, key) of options"
        :key="key"
        :value="item"
        :selected="item === modelValue"
      >
        {{ item }} - {{ item === modelValue }} {{ modelValue }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
type Props = {
  name: string
  label?: string
  modelValue?: string | number | null
  options: string[] | number[]
}

defineProps<Props>()

const selectedValue = defineModel()
</script>

<style></style>
