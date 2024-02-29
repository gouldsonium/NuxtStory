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
    description: () => props.blok?.meta_description || 'At Knightwood Portfolio we provide a range of investment products for investors all over the world',
    ogDescription: () => props.blok?.meta_description || 'At Knightwood Portfolio we provide a range of investment products for investors all over the world',
  });

  useServerSeoMeta({
    title: () => props.blok?.meta_title || 'Page Title',
    ogTitle: () => props.blok?.meta_title || 'Page Title',
    description: () => props.blok?.meta_description || 'At Knightwood Portfolio we provide a range of investment products for investors all over the world',
    ogDescription: () => props.blok?.meta_description || 'At Knightwood Portfolio we provide a range of investment products for investors all over the world',
  });
</script>