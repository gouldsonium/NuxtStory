<script setup>
const props = defineProps({ blok: Object });
const resolvedRichText = computed(() => renderRichText(props.blok.text));

const sectionClass = computed(() => {
  return [
    props.blok?.width,
    props.blok?.position,
    'px-5'
  ]
});
</script>

<template>
  <div v-editable="blok" :style="{ backgroundColor: blok.background_color?.color }" :class="sectionClass">
    <h2 
      v-if="blok?.title" 
      class="text-gray-800 font-heading dark:text-white"
      :style="{ color: blok.title_color?.color }" 
      :class="blok?.text_center ? 'text-center' : 'text-left'"
    >
      {{ blok.title }}
    </h2>
    <h3 
      v-if="blok?.subtitle" 
      class="font-heading" 
      :style="{ color: blok.subtitle_color?.color }"
      :class="blok?.text_center ? 'text-center' : 'text-left'"
    >
      {{ blok.subtitle }}
    </h3>
    <div v-if="blok?.text" v-html="resolvedRichText" class="max-w-none prose my-5 dark:text-gray-100"
      :class="{ 'prose-invert text-white': blok.invert, 'text-center': blok?.text_center }">
    </div>
  </div>
</template>
