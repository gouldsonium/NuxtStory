<script setup>
  const props = defineProps({ blok: Object });
  const videoMaxHeight = computed(() => {
    return !!props.blok?.max_height ? { maxHeight: props.blok?.max_height + 'px' } : null
  })
</script>

<template>
  <div v-editable="blok" class="flex" :class="blok?.position">
    <video
      v-if="!!blok.video?.filename"
      controls
      preload="auto"
      :style="videoMaxHeight"
      :poster="blok.placeholder?.filename"
    >
      <source :src="blok.video?.filename" type="video/mp4" />
    </video>
  </div>
</template>