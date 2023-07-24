<template>
  <section v-editable="blok" class="bg-primary px-3 py-12" :style="{backgroundColor: blok.background_color?.color}">
    <div class="container mx-auto">
      <h2 v-if="!!blok.title" class="text-secondary font-bold text-4xl mb-5" :style="{color: blok.title_color?.color}">
        {{ blok.title }}
      </h2>    
      <div v-if="!!blok?.content" 
        v-html="resolvedRichText" 
        class="max-w-none py-2 prose mb-5"
        :class="{'prose-invert' : blok.invert}"
      ></div>
      <StoryblokComponent
        v-for="blok in blok.items"
        :key="blok._uid"
        :blok="blok"
        class="w-full h-full"
      />
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ blok: Object })
 
const resolvedRichText = computed(() => renderRichText(props.blok.content))
</script>