<template>
  <div v-editable="blok" :style="{ backgroundColor: blok.background_color?.color }">
    <img
      v-if="blok.image?.filename"
      :src="blok.image.filename + '/m/1600x0'"
      :alt="blok.image.alt"
      class="w-full h-[360px] lg:h-[450px] object-cover"
      :class="{ 'filter brightness-50': blok?.darken}"
    />
    <div class="container mx-auto py-12">
      <h1 class="text-6xl text-secondary font-bold mb-4" :style="{ color: blok.headline_teaser_color?.color }">
        {{ blok.title }}
      </h1>
      <h2 class="text-2xl text-gray-900 font-semibold mb-4" :style="{ color: blok.headline_teaser_color?.color }">
        {{ blok.teaser }}
      </h2>
      <div v-html="resolvedRichText" class="prose" :class="{'prose-invert': blok.invert}"></div>
    </div>
  </div>
</template>
   
<script setup>
  const props = defineProps({ blok: Object })
  const resolvedRichText = computed(() => renderRichText(props.blok.content))
</script>