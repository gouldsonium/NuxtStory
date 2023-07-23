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
    :class="{ 'pt-32 lg:py-12': !!blok.image?.filename}"
    :style="backgroundStyle"
  >
    <!-- If background video exists, add the <video> element -->
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

    <div class="flex flex-col lg:flex-row justify-center items-center z-10 w-full text-center py-6 px-5 min-h-full">
      <div class="text-gray-900">
        <h1 class="text-6xl font-bold mb-3" :style="{color: blok.title_color?.color}">{{ blok.title }}</h1>
        <h2 class="text-4xl font-light" :style="{color: blok.text_color?.color}">{{ blok.text }}</h2>
      </div>
      <div class="w-full lg:w-1/2 p-5" v-if="!!blok.image?.filename">
        <img :src="blok.image?.filename" alt="hero-img">
      </div>
    </div>
  </section>
</template>

<style scoped>
video{
  filter: brightness(0.5);
}
</style>