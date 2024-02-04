<script setup>
const { slug } = useRoute().params;
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
  <StoryblokComponent v-if="slug != 'login' && story" :blok="story.content" />
  <Login v-else-if="slug == 'login'" />
  <PageNotFound v-else />
</template>