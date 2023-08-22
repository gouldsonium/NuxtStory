<template>
  <section v-editable="blok" :style="{backgroundColor: blok.background_color?.color}">
    <div class="grid" :class="gridClass">
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
      props.blok?.max_columns == 5 ? 'sm:grid-cols-3 xl:grid-cols-5' 
      : props.blok?.max_columns == 4 ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
      : props.blok?.max_columns == 3 ? 'sm:grid-cols-2 lg:grid-cols-3' 
      : props.blok?.max_columns == 2 ? 'sm:grid-cols-2' : '',
      props.blok?.grid_spacing ? 'gap-12' : 'gap-5',
      props.blok?.min_columns == 1 ? 'grid-cols-1' : 
      props.blok?.min_columns == 2 ? 'grid-cols-1 xs:grid-cols-2' :
      props.blok?.min_columns == 3 ? 'grid-cols-3' : 'grid-cols-1'
    ]
  })
</script>