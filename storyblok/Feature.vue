<template>
  <div
    v-editable="blok" :class="layoutClass"
    class="w-full flex flex-col justify-center items-center p-12 bg-primary"
    :style="{backgroundColor: blok.background_color?.color}"
  >
    <div :class="blok.constrained ? 'md:w-1/2 w-full' : 'w-full'" class="px-3 py-6">
      <h2 v-if="!!blok.name" class="text-4xl text-secondary font-bold" :style="{color: blok.title_color?.color}">
        {{ blok.name }}
      </h2>
      <div v-if="!!blok?.content" 
        v-html="resolvedRichText" 
        class="max-w-none p-2 prose"
        :class="{'prose-invert' : blok.invert}"
      ></div>
    </div>
    <img
      v-if="!!blok.image?.filename"
      :src="blok.image.filename"
      :alt="blok.image.alt"
      class="max-h-[400px] object-cover w-full px-3"
      :class="imageClass"
    />
  </div>
</template>
   
<script setup>
  const props = defineProps({ blok: Object })
  const resolvedRichText = computed(() => renderRichText(props.blok.content))

  const layoutClass = computed(() => {
    return [
      props.blok.layout == 'left' ? 'md:flex-row' : '',
      props.blok.layout == 'right' ? 'md:flex-row-reverse' : '',
      props.blok.layout == 'top' ? 'md:flex-col' : '',
      props.blok.layout == 'bottom' ? 'md:flex-col-reverse' : '',
      props.blok.text_center == true ? 'text-center' : ''
    ]
  });

  const imageClass = computed(() => {
    return [
      // props.blok.constrained ? 'md:w-1/2 md:max-w-6xl' : '',
      (props.blok.layout == 'top' || props.blok.layout == 'bottom') && !props.blok.constrained 
      ? 'w-full' : 'md:w-1/2 md:max-w-6xl'    
    ]
  })
</script>