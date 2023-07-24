<template>
  <div v-editable="blok" :style="{ backgroundColor: blok.background_color?.color }"
    class="w-full flex flex-col justify-center items-center bg-primary">
    <div :class="layoutClass" class="flex flex-col justify-center items-center w-full h-full overflow-hidden"
      :style="{ borderColor: blok.border_color?.color }">
      <div class="md:px-3 py-6 w-full overflow-hidden">
        <h2 v-if="!!blok.name" class="text-secondary font-bold" :class="blok.in_grid ? 'text-2xl' : 'text-4xl'"
          :style="{ color: blok.title_color?.color }">
          {{ blok.name }}
        </h2>
        <div v-if="!!blok?.content" v-html="resolvedRichText" class="max-w-none py-2 prose"
          :class="{ 'prose-invert': blok.invert }"></div>
        <StoryblokComponent class="mr-3 my-3 text-base" v-for="blok in blok.buttons" :key="blok._uid" :blok="blok" />
      </div>
      <img v-if="!!blok.image?.filename" :src="blok.image.filename" :alt="blok.image.alt"
        class="max-h-[400px] object-cover w-full md:px-3" :class="imageClass" />
    </div>
  </div>
</template>
   
<script setup>
const props = defineProps({ blok: Object })
const resolvedRichText = computed(() => renderRichText(props.blok.content))

const layoutClass = computed(() => {
  const { layout, text_center, in_grid, border, constrained } = props.blok;
  return [
    layout === 'left' ? 'md:flex-row' : layout === 'right' ? 'md:flex-row-reverse'
      : layout === 'top' ? 'md:flex-col' : layout === 'bottom' ? 'md:flex-col-reverse' : '',
    text_center ? 'text-center' : '',
    in_grid ? 'p-5' : 'p-12',
    border == 'square' ? 'border' : border == 'rounded' ? 'border rounded-lg' : 'border-none',
    constrained ? 'max-w-6xl' : ''
  ];
});


const imageClass = computed(() => {
  return [
    props.blok?.in_grid ? 'h-48 xl:h-72' : '',
    (props.blok.layout == 'top' || props.blok.layout == 'bottom') && !props.blok.constrained
      ? 'w-full' : 'md:w-1/2 md:max-w-6xl'
  ]
})
</script>