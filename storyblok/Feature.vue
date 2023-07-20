<template>
  <div
    v-editable="blok"
    class="w-full p-12 bg-secondary rounded-[5px] text-center"
  >
    <img
      v-if="!!blok.image"
      :src="blok.image.filename"
      :alt="blok.image.alt"
      class="w-full h-48 xl:h-72 object-cover"
    />
    <h3 class="text-2xl text-primary font-bold">
      {{ blok.name }}
    </h3>
  </div>
</template>
   
<script setup>
  defineProps({ blok: Object })
</script>