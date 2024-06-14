<script setup>
  const props = defineProps({ blok: Object });
  const resolvedRichText = computed(() => renderRichText(props.blok.text));
</script>

<template>
  <div :id="blok?.section_id" style="position: relative; visibility: hidden;" class="md:top-[-100px]"></div>
  <section class="py-24 px-3 bg-gray-100 dark:bg-gray-800" :style="{ backgroundColor: blok.background_color?.color }">
    <div class="container mx-auto">
      <h2 v-if="!!blok?.headline"
        class="font-semibold flex items-center text-center justify-center font-heading text-gray-800 dark:text-gray-100"
        :style="{ color: blok.headline_color?.color }">
        <span class="sm:mx-3">
          {{ blok?.headline }}
        </span>
      </h2>
      <div 
        v-if="!!resolvedRichText" v-html="resolvedRichText" class="max-w-none prose mt-5 text-center text-gray-800 dark:text-gray-100" 
        :class="{ 'prose-invert text-white': blok.invert}">
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 my-12 place-items-start">
        <ArticleCard v-for="(article, index) in blok.articles" :key="article.uuid" :article="article.content"
          :slug="article.full_slug" data-aos="fade-right" :data-aos-delay="index * 100" :data-aos-once="true" />
      </div>
    </div>
  </section>
</template>