<script setup>
  const props = defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok" style="box-shadow: 0 0 2px 2px #00000020" :style="{borderBottomColor: blok.border_color?.color}"
  class="bg-white rounded-lg rounded-b-none px-10 py-5 flex flex-col items-center justify-start w-full h-full border-b-4 border-b-secondary">
    <div class="w-full flex flex-col justify-start items-center">
      <img :src="blok.image?.filename" :alt="blok.image?.alt" class="h-32 -mt-16">
      <h4 class="text-center font-semibold mt-12">{{ blok?.title }}</h4>
    </div>
  </div>
</template>