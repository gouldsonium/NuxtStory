<script setup>
  const props = defineProps({ blok: Object });

  const heroHeight = computed(() => {
    return !!props.blok?.full_screen ? { height: '100vh' } : {maxHeight: '800px'}
  });
</script>

<template>
  <section v-editable="blok" :style="{backgroundColor: blok.background_color?.color, ...heroHeight}">
    <div class="image-box" :style="{minHeight: `${blok.height}px`, ...heroHeight}">
      <NuxtImg 
        v-if="blok?.background_image?.filename" 
        :src="blok?.background_image?.filename" 
        alt="Background Image" placeholder
        class="img-background" provider="storyblok"
        :class="{'brightness-50' : blok?.background_image_darken}"
        :style="{...heroHeight}"
      />
      <div 
        class="grid grid-cols-1 z-10 w-full py-6 sm:px-5 min-h-full container py-48" 
        :class="{'lg:grid-cols-3' : !blok?.text_center}"
        :data-aos="blok?.animate" :data-aos-once="true"
      >
        <div class="flex flex-col justify-center px-8 sm:px-24 lg:col-span-2" :class="{'text-center items-center' : blok?.text_center}">
          <h1 class="mb-3 z-30 font-heading text-gray-800 dark:text-gray-100" :style="{color: blok.title_color?.color}">
            {{ blok?.title || 'Page Title' }}
          </h1>
          <p v-if="!!blok?.text"class="font-light z-30 text-gray-800 dark:text-gray-100" :style="{color: blok.text_color?.color}">
            {{ blok?.text }}
          </p>
          <div class="mt-10 flex flex-wrap z-30" v-if="blok?.buttons">
            <StoryblokComponent
              class="mr-3 mb-3 w-full sm:w-auto"
              v-for="blok in blok.buttons"
              :key="blok._uid"
              :blok="blok"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Ensure image and content is spread out */
section{
  overflow: hidden;
}
.image-box{
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.img-background {
  position: absolute;
  width: 100%;
  height: 100%;
  /* max-height: 800px; */
  object-fit: cover; /* Zoom in while preserving aspect ratio */
}
</style>
