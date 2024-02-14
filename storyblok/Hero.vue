<script setup>
  import { ref, onMounted, computed } from 'vue';
  const props = defineProps({ blok: Object });

  const backgroundImageLoaded = ref(false);

  // Function to handle the image load event
  const handleImageLoad = () => {
    backgroundImageLoaded.value = true;
  };

  // Run this code after the component is mounted
  onMounted(() => {
    const image = new Image();
    image.onload = handleImageLoad;
    image.src = props.blok.background_image?.filename;
  });

  // Define the computed property for the background image style
  const imageBoxStyle = computed(() => {
    return {
      backgroundImage: backgroundImageLoaded.value
        ? `linear-gradient(to right, #22283180, #22283180), url(${props.blok.background_image?.filename})`
        : 'none',
      visibility: backgroundImageLoaded.value ? 'visible' : 'hidden',
      backgroundColor: backgroundImageLoaded.value ? '#ffffff' : '#10336e'
    };
  });
</script>

<template>
  <section class="out-box min-h-screen" v-editable="blok" :style="{backgroundColor: blok.background_color?.color}">
    <div class="shape-box min-h-screen">
      <div class="image-box" :style="imageBoxStyle">
        <div class="grid grid-cols-1 lg:grid-cols-3 z-10 w-full py-6 sm:px-5 min-h-full container py-48">
          <div class="text-white flex flex-col justify-center px-8 sm:px-24 lg:col-span-2" :class="blok.text_position">
            <h1 class="mb-3">{{ blok?.title || 'Page Title' }}</h1>
            <p class="font-light">{{ blok?.text }}</p>
            <div class="mt-10 flex flex-wrap" v-if="blok?.buttons">
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
    </div>
  </section>
</template>

<style scoped>
.image-box{
  min-height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
}

</style>

