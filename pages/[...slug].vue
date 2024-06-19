<script setup>
const { slug } = useRoute().params;
// fetch the articles in an article list object
const resolveRelations = ['articles-list.articles'];
const runtimeConfig = useRuntimeConfig();

const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join('/') : 'home',
  {
    version: runtimeConfig.public.VERSION,
    resolve_relations: resolveRelations,
  },
  {
    resolveRelations,
  }
)
</script>
 
<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
  <PageNotFound v-else />
</template>