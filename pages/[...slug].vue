<script setup>
const { slug } = useRoute().params
 
const resolveRelations = ['articles-list.articles']
 
const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join('/') : 'home',
  {
    version: 'draft',
    resolve_relations: resolveRelations,
  },
  {
    resolveRelations,
  }
)

const metafields = story.value.content.metafields;
useSeoMeta({
  title: () => metafields?.title || 'Page Title',
  ogTitle: () => metafields?.og_title || metafields?.title || 'Page Title',
  description: () => metafields?.description  || 'Page Title',
  ogDescription: () => metafields?.og_description || metafields?.description  || 'Page Title',
  ogImage: () => metafields?.og_image || null,
  twitterTitle: () => metafields?.twitter_title || null,
  twitterDescription: () => metafields?.twitter_description || null,
  twitterImage: () => metafields?.twitter_image || null
});

useServerSeoMeta({
  title: () => metafields?.title || 'Page Title',
  ogTitle: () => metafields?.og_title || metafields?.title || 'Page Title',
  description: () => metafields?.description  || 'Page Title',
  ogDescription: () => metafields?.og_description || metafields?.description  || 'Page Title',
  ogImage: () => metafields?.og_image || null,
  twitterTitle: () => metafields?.twitter_title || null,
  twitterDescription: () => metafields?.twitter_description || null,
  twitterImage: () => metafields?.twitter_image || null
});
</script>
 
<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>