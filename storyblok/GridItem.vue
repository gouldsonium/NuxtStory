<template>
  <div v-editable="blok" class="h-full flex flex-col" :class="itemClass" 
  :style="{backgroundColor: blok.background_color?.color, ...borderStyle}">
    <StoryblokComponent
      v-for="blok in blok.content"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<script setup>
  const props = defineProps({ blok: Object });

  const itemClass = computed(() => {
    return [
      props.blok.position,
      props.blok?.border,
      props.blok?.border_thickness > 0 ? 'p-3' : ''
    ]
  });

  const borderStyle = computed(() => {
    return {border: 'solid' + ' ' + props.blok.border_color?.color + ' ' + props.blok?.border_thickness + 'px'}
  })
</script>