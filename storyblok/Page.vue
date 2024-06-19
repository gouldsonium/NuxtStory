<template>
  <div v-editable="blok">
    <StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
  </div>
</template>
   
<script setup>
  const props = defineProps({ blok: Object });

  // SEO for both static and SSR versions
  useSeoMeta({
    title: () => props.blok?.meta_title || 'Page Title',
    ogTitle: () => props.blok?.meta_title || 'Page Title',
    description: () => props.blok?.meta_description || 'Page Description',
    ogDescription: () => props.blok?.meta_description || 'Page Description',
    ogImage: () => props.blok?.og_image?.filename || null
  });

  useServerSeoMeta({
    title: () => props.blok?.meta_title || 'Page Title',
    ogTitle: () => props.blok?.meta_title || 'Page Title',
    description: () => props.blok?.meta_description || 'Page Description',
    ogDescription: () => props.blok?.meta_description || 'Page Description',
    ogImage: () => props.blok?.og_image?.filename || null
  });
</script>