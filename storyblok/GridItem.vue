<template>
  <div 
    v-editable="blok" 
    class="h-full w-full flex flex-col" 
    :class="itemClass" 
    :style="{ backgroundColor: blok.background_color?.color, ...borderStyle, ...orderStyle }"
    :data-aos="blok?.animate" 
    :data-aos-delay="blok?.delay" 
    data-aos-once="true"
  >
    <StoryblokComponent
      v-for="blok in blok.content"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({ blok: Object });
const orderStyle = ref({});

const updateOrderStyle = () => {
  const isMobile = window.innerWidth < 1024;
  orderStyle.value = isMobile && props.blok?.mobile_order
    ? { order: props.blok.mobile_order }
    : { order: 'unset' };
};

onMounted(() => {
  window.addEventListener('resize', updateOrderStyle);
  updateOrderStyle(); // initial call
});

onUnmounted(() => {
  window.removeEventListener('resize', updateOrderStyle);
});

const itemClass = computed(() => {
  return [
    props.blok.position,
    props.blok?.border,
    props.blok?.padding ? 'p-3' : '',
  ];
});

const borderStyle = computed(() => {
  return props.blok?.border
    ? {
        border: 'solid ' + props.blok.border_color?.color + ' ' + props.blok?.border_thickness + 'px',
      }
    : null;
});
</script>
