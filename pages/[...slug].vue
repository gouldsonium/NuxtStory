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

console.log(story.value.name)
const pageName = story.value.name
// No longer works, requires plan upgrade in storyblok
// const metafields = story.value.content.metafields;
useSeoMeta({
  title: () => 'Rosbotham Finance: ' + pageName,
  ogTitle: () => 'Rosbotham Finance: ' + pageName,
  description: () => "Great financial planning is not about fancy investment or hot tips. It's about who you are, what sort of life you live and what you want out of life",
  ogDescription: () => "Great financial planning is not about fancy investment or hot tips. It's about who you are, what sort of life you live and what you want out of life",
});

useServerSeoMeta({
  title: () => 'Rosbotham Finance: ' + pageName,
  ogTitle: () => 'Rosbotham Finance: ' + pageName,
  description: () => "Great financial planning is not about fancy investment or hot tips. It's about who you are, what sort of life you live and what you want out of life",
  ogDescription: () => "Great financial planning is not about fancy investment or hot tips. It's about who you are, what sort of life you live and what you want out of life",
});
</script>
 
<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>