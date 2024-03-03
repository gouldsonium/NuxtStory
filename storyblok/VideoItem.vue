<script setup>
  const props = defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok" class="flex my-5" :class="blok?.position">
    <iframe :width="blok.width" :height="blok.height" :src="blok.youtube_video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>
</template>