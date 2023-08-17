<template>
  <section v-editable="blok" :style="{backgroundColor: blok.background_color?.color}">
    <div class="grid grid-cols-1" :class="gridClass">
      <StoryblokComponent
        v-for="blok in blok.columns"
        :key="blok._uid"
        :blok="blok"
        class="h-full"
      />
    </div>
  </section>
</template>
 
<script setup>
  const props = defineProps({ blok: Object });

  const gridClass = computed(() => {
    return [
      props.blok?.max_columns == 4 ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
      : props.blok?.max_columns == 3 ? 'sm:grid-cols-2 lg:grid-cols-3' 
      : props.blok?.max_columns == 2 ? 'sm:grid-cols-2' : '',
      props.blok?.grid_spacing ? 'gap-12' : ''
    ]
  })
</script>