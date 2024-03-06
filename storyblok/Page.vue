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
    description: () => props.blok?.meta_description || 'Page Description',
    ogDescription: () => props.blok?.meta_description || 'Page Description',
  });

  useServerSeoMeta({
    title: () => props.blok?.meta_title || 'Page Title',
    ogTitle: () => props.blok?.meta_title || 'Page Title',
    description: () => props.blok?.meta_description || 'Page Description',
    ogDescription: () => props.blok?.meta_description || 'Page Description',
  });
</script>