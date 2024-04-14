<template>
  <div v-editable="blok" class="py-5" :style="{backgroundColor: blok.background_color?.color}">
    <StoryblokComponent
      v-for="blok in blok.items"
      :key="blok._uid"
      :blok="blok"
      class="w-full h-full"
    />
  </div>
</template>

<script setup>
  const props = defineProps({ blok: Object })
</script>