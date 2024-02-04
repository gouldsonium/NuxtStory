<script setup>
  const props = defineProps({ blok: Object });
  const imageMaxHeight = computed(() => {
    return !!props.blok?.max_height && props.blok?.max_height > 0 ? { maxHeight: props.blok?.max_height + 'px' } : null
  })
</script>

<template>
  <div v-editable="blok" class="flex w-full" :class="blok?.position">
    <img v-if="!!blok.image?.filename" :src="blok.image.filename" :alt="blok.image.alt" :style="imageMaxHeight" class="w-full h-full">
  </div>
</template>