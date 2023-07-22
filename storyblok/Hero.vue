<template>
  <section
    v-editable="blok"
    class="min-h-[700px] relative flex items-center justify-center rounded-[5px] overflow-hidden"
    :style="backgroundImageStyle"
  >
    <div class="relative z-10 w-full text-center py-6 px-3"
      :class="hasBackgroundImage ? 'text-white' : 'text-gray-900'"
    >
      <h1 class="text-6xl font-bold mb-3">
        {{ blok.title }}
      </h1>
      <h2 class="text-4xl font-light">
        {{ blok.text }}
      </h2>
    </div>
  </section>
</template>
 
<script setup>
const props = defineProps({ blok: Object })

const hasBackgroundImage = !!props.blok.background_image?.filename;
const backgroundImageStyle = computed(() => {
  if(hasBackgroundImage){
    return {
      backgroundImage: 'linear-gradient(to right, #22283180, #22283180), url(' + props.blok.background_image.filename + ')',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }
  }
  return null;
})
</script>