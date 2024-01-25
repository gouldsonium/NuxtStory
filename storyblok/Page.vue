<template>
  <div v-editable="blok">
    <StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
  </div>
</template>
   
<script setup>
  const props = defineProps({ blok: Object });

  useSeoMeta({
    title: () => props.blok?.meta_title || 'Page Title',
    ogTitle: () => props.blok?.meta_title || 'Page Title',
    description: () => "Page meta description needs to come from somewhere else",
    ogDescription: () => "Page meta description needs to come from somewhere else",
  });

  useServerSeoMeta({
    title: () => props.blok?.meta_title || 'Page Title',
    ogTitle: () => props.blok?.meta_title || 'Page Title',
    description: () => "Page meta description needs to come from somewhere else",
    ogDescription: () => "Page meta description needs to come from somewhere else",
  });
</script>