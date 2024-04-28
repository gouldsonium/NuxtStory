<template>
  <div class="carousel relative h-full" v-editable="blok" :style="{maxHeight: !!blok.height ? blok.height : '600px'} ">
    <div class="carousel-inner" :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
      <div
        v-for="(item, index) in carouselItems"
        :key="index"
        class="carousel-item relative"
        :style="{ zIndex: index === activeIndex ? 1 : 0, maxHeight: !!blok.height ? blok.height : '600px' }"
      >
        <NuxtImg
          v-if="item.image?.filename" placeholder
          :src="item.image?.filename" provider="storyblok"
          :alt="'carousel-item-'[index]" 
          class="d-block w-full object-cover h-full"
          :class="{'filter brightness-50' : item?.darken}"
        />
        <div
          v-if="item.title"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-2 text-center text-white transition-opacity transition-transform"
          :style="{ color: item.title_color?.color, opacity: index === activeIndex ? 1 : 0, transform: `translate(-50%, -50%) translateX(${100 * (index - activeIndex)}%)` }"
        >
          <h3 class="mb-2 font-bold text-base xs:text-xl sm:text-2xl font-heading">{{ item.title }}</h3>
          <p class="text-xs xs:text-base sm:text-xl" :style="{ color: item.text_color?.color }">{{ item.text }}</p>
        </div>
      </div>
    </div>
    
    <button v-if="activeIndex != 0" @click="moveCarousel(-1)" 
      class="carousel-control-prev absolute top-1/2 left-4 -translate-y-1/2 bg-secondary" 
      :style="{backgroundColor: blok?.button_color?.color}"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
        class="w-6 h-6" :style="{color: blok?.chevron_color?.color}">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <button @click="moveCarousel(1)" class="carousel-control-next absolute top-1/2 right-4 -translate-y-1/2 bg-secondary" 
    :style="{backgroundColor: blok?.button_color?.color}">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
      <svg 
        v-if="activeIndex != (carouselItems.length - 1)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
        stroke-width="1.5" stroke="currentColor" class="w-6 h-6" :style="{color: blok?.chevron_color?.color}"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
      <svg 
        v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
        class="w-6 h-6" :style="{color: blok?.chevron_color?.color}">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
      </svg>
    </button>
  </div>
</template>
  
<script setup>
  const props = defineProps({ blok: Object });

  const carouselItems = computed(() => {
    return props.blok?.slides;
  });

  const activeIndex = ref(0);

  const moveCarousel = (increment) => {
    activeIndex.value = (activeIndex.value + increment + carouselItems.value.length) % carouselItems.value.length;
  };
</script>
  
<style scoped>
.carousel {
  max-width: 100%;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  transition: transform 0.3s ease;
}

.carousel-item {
  flex-shrink: 0;
  width: 100%;
}

.carousel-control-prev,
.carousel-control-next {
  color: white;
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  opacity: 0.5;
  transition: all 0.3s;
}
.carousel-control-prev {
  left: 0;
}
.carousel-control-next {
  right: 0;
}
.carousel-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  color: #fff;
}

.carousel-content h3 {
  font-weight: bold;
  margin-bottom: 12px;
}
</style>
  