<script setup>
  const props = defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok" class="flex my-5 w-full justify-center" :class="blok?.position">
    <div class="video-container">
      <iframe 
        class="w-full aspect-video" 
        :src="blok.youtube_video" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.aspect-video {
  aspect-ratio: 16/9; /* Maintain the aspect ratio of 16:9 */
}

.video-container {
  max-width: 1000px; /* Set the max width as desired */
  width: 100%; /* Ensure it is responsive */
}
</style>
