<template>
  <section v-editable="blok" :style="{ backgroundColor: blok.background_color?.color }">
    <div class="grid" :class="gridClass">
      <StoryblokComponent
        v-for="blok in displayColumns"
        :key="blok._uid"
        :blok="blok"
        class="h-full w-full"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({ blok: Object });
const screenWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024);

const gridClass = computed(() => {
  return [
    props.blok?.max_columns == 5 ? 'sm:grid-cols-3 xl:grid-cols-5' 
    : props.blok?.max_columns == 4 ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
    : props.blok?.max_columns == 3 ? 'sm:grid-cols-2 lg:grid-cols-3' 
    : props.blok?.max_columns == 2 ? 'lg:grid-cols-2' : '',
    props.blok?.grid_spacing ? 'gap-12' : 'gap-0',
    props.blok?.min_columns == 1 ? 'grid-cols-1' 
    : props.blok?.min_columns == 2 ? 'grid-cols-2' 
    : props.blok?.min_columns == 3 ? 'grid-cols-3' : 'grid-cols-1',
  ];
});

const reorderedColumns = computed(() => {
  const columns = [...props.blok.columns];
  if (props.blok?.mobile_grid_reverse && screenWidth.value < 1024) {
    for (let i = 3; i < columns.length; i += 4) {
      const temp = columns[i];
      columns[i] = columns[i - 1];
      columns[i - 1] = temp;
    }
  }
  return columns;
});

const displayColumns = ref(reorderedColumns.value);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  updateScreenWidth();
  window.addEventListener('resize', updateScreenWidth);
});

watch(screenWidth, () => {
  displayColumns.value = reorderedColumns.value;
});

// Cleanup event listener when the component is unmounted
onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth);
});
</script>
