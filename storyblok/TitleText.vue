<script setup>
  const props = defineProps({ blok: Object });
  const resolvedRichText = computed(() => renderRichText(props.blok.text));

  const sectionClass = computed(() => {
    return [
      props.blok?.width,
      props.blok?.position,
      'bg-primary'
    ]
  });

</script>

<template>
  <div v-editable="blok" :style="{ backgroundColor: blok.background_color?.color }" :class="sectionClass">
    <h3 v-if="!!blok?.title" class="font-semibold text-secondary mb-5" :style="{color: blok.title_color?.color}"
      :class="{'text-center' : blok?.text_center}">
        {{ blok?.title }}
      </h3>
      <div v-if="!!blok?.text" v-html="resolvedRichText" class="max-w-none prose"
        :class="{ 'prose-invert': blok.invert, 'text-center' : blok?.text_center}"></div>
  </div>
</template>
