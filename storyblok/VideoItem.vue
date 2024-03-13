<script setup>
  const props = defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok" class="flex my-5 w-full" :class="blok?.position">
    <iframe 
      class="w-full aspect-video" 
      :src="blok.youtube_video" 
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.aspect-video {
  aspect-ratio: 16/9; /* Maintain the aspect ratio of 16:9 */
}
</style>
