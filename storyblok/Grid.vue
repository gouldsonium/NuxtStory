<template>
  <section v-editable="blok" :style="{backgroundColor: blok.background_color?.color}" class="py-12">
    <div class="container mx-auto grid grid-cols-1 gap-12 place-items-center px-3" :class="gridClass">
      <StoryblokComponent
        v-for="blok in blok.columns"
        :key="blok._uid"
        :blok="blok"
        class="w-full h-full"
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
      : props.blok?.max_columns == 2 ? 'sm:grid-cols-2' : ''
    ]
  })
</script>