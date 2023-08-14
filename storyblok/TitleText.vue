<script setup>
  const props = defineProps({ blok: Object });
  const resolvedRichText = computed(() => renderRichText(props.blok.text));

  const sectionClass = computed(() => {
    return [
      props.blok?.width,
      props.blok?.position,
      'bg-primary mb-10'
    ]
  });

</script>

<template>
  <div v-editable="blok" :style="{ backgroundColor: blok.background_color?.color }" :class="sectionClass">
    <h2 v-if="!!blok?.title" class="font-semibold text-secondary" :style="{color: blok.title_color?.color}"
      :class="{'text-center' : blok?.text_center}">
        {{ blok?.title }}
    </h2>
    <h4 :style="{color: blok.subtitle_color?.color}" class="text-[#10336e]" :class="{'text-center' : blok?.text_center}">
      {{ blok?.subtitle }}
    </h4>
    <img v-if="!!blok?.title || !!blok?.subtitle" src="~/assets/img/dash.png" class="my-5 h-2" alt="dash.png" :class="{'mx-auto' : blok?.text_center}">
    <div v-if="!!blok?.text" v-html="resolvedRichText" class="max-w-none prose my-5"
      :class="{ 'prose-invert': blok.invert, 'text-center' : blok?.text_center}"></div>
  </div>
</template>
