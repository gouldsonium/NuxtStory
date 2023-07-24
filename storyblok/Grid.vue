<template>
  <section v-editable="blok" :style="{backgroundColor: blok.background_color?.color}" class="py-12">
    <div class="container mx-auto grid gap-12 place-items-center px-3" :class="gridClass">
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
      props.blok?.columns.length % 3 == 0 ? 'sm:grid-cols-2 lg:grid-cols-3'
      : props.blok?.columns.length % 2 == 0 ? 'md:grid-cols-2' : ''
    ]
  })
</script>