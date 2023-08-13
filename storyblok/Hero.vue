<script setup>
  const props = defineProps({ blok: Object });

  // For the background style object
  const hasBackgroundImage = computed(() => {return !!props.blok.background_image?.filename});  
  const hasBackgroundColor = computed(() => {return !!props.blok.background_color?.color});

  const backgroundStyle = computed(() => {
    if (hasBackgroundImage.value) {
      return {
        backgroundImage: `linear-gradient(to right, #22283180, #22283180), url(${props.blok.background_image.filename})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      };
    }

    if(hasBackgroundColor.value){
      return {backgroundColor: props.blok.background_color?.color}
    }

    return null;
  });
</script>

<template>
  <section
    v-editable="blok"
    class="min-h-[700px] relative flex items-center justify-center overflow-hidden"
    :class="{ 'pt-32 lg:py-20': !!blok.image?.filename}"
    :style="backgroundStyle"
  >
    <video
      v-if="!!blok.background_video?.filename"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      class="absolute top-0 left-0 w-full h-full object-cover z-0"
    >
      <source :src="blok.background_video?.filename" type="video/mp4" />
      <!-- Add more <source> elements for other video formats if needed -->
    </video>

    <div class="grid grid-cols-1 z-10 w-full py-6 px-5 min-h-full container" 
      :class="blok.image?.filename ? 'md:grid-cols-2 gap-5':'', blok.text_position == 'items-center' ? 'text-center' : ''">
      <div class="text-gray-900 flex flex-col justify-center" :class="blok.text_position">
        <h1 class="font-bold mb-3" :style="{color: blok.title_color?.color}">{{ blok?.title || 'Page Title' }}</h1>
        <h2 class="font-light" :style="{color: blok.text_color?.color}">{{ blok?.text }}</h2>
        <div class="mt-10 flex justify-center items-center" v-if="blok?.buttons">
          <StoryblokComponent
            class="mx-3 text-lg"
            v-for="blok in blok.buttons"
            :key="blok._uid"
            :blok="blok"
          />
        </div>
      </div>
      <div class="w-full p-5" v-if="!!blok.image?.filename">
        <img :src="blok.image?.filename" :alt="blok.image?.alt">
      </div>
    </div>
  </section>
</template>

<style scoped>
video{
  filter: brightness(0.5);
}
</style>