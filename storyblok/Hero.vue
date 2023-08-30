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
  <section class="out-box" v-editable="blok" :style="{backgroundColor: blok.background_color?.color}">
    <div class="shape-box">
      <div class="image-box" :style="imageBoxStyle">
        <div class="grid grid-cols-1 lg:grid-cols-3 z-10 w-full py-6 px-5 min-h-full container py-48">
          <div class="text-white flex flex-col justify-center px-24 lg:col-span-2" :class="blok.text_position">
            <h1 class="font-bold mb-3 uppercase">{{ blok?.title || 'Page Title' }}</h1>
            <p class="font-light">{{ blok?.text }}</p>
            <div class="mt-10 flex" v-if="blok?.buttons">
              <StoryblokComponent
                class="text-lg"
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
/* Add a style rule to control the image visibility */

.out-box{
  width: 100%;
  overflow: hidden;
}
.shape-box{
	border-bottom-left-radius: 100% 250px;
	border-bottom-right-radius: 100% 250px;
	width: calc(100% + 100px) ;
	margin-left: -50px;
  overflow: hidden;
  border-bottom: solid 20px #00ccff;
}
.image-box{
  min-height: 700px;
  width: 100%;
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
}

</style>

