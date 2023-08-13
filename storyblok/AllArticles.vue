<template>
    <div class="py-24" :style="{backgroundColor: blok.background_color?.color}">
      <h2 v-if="blok.headline" class="text-secondary font-bold text-center mb-12" :style="{color: blok.headline_color?.color}">
        {{ blok.headline }}
      </h2>
      <div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">
        <ArticleCard
          v-for="article in articles"
          :key="article.uuid"
          :article="article.content"
          :slug="article.full_slug"
        />
      </div>
    </div>
</template>
   
<script setup>
  defineProps({ blok: Object })
   
  const articles = ref(null)
  const storyblokApi = useStoryblokApi()
  const { data } = await storyblokApi.get('cdn/stories', {
    version: 'draft',
    starts_with: 'blog',
    is_startpage: false,
  })
  articles.value = data.stories
</script>