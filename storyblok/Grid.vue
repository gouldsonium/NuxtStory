<template>
  <div
    v-editable="blok"
    class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-center"
  >
    <StoryblokComponent
      v-for="blok in blok.columns"
      :key="blok._uid"
      :blok="blok"
      class="w-full h-full"
    />
  </div>
</template>
 
<script setup>
  defineProps({ blok: Object });
</script>