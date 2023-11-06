<template>
  <section class="py-24 px-3" :style="{ backgroundColor: blok.background_color?.color }">
    <div class="container mx-auto">
      <h2 v-if="!!blok?.headline"
        class="font-bold flex items-center text-center justify-center uppercase"
        :style="{ color: blok.headline_color?.color }">
        <span class="hidden sm:flex">
          <img src="~/assets/img/dash.png" class="my-5 h-2" alt="dash.png">
        </span>
        <span class="sm:mx-3">
          {{ blok?.headline }}
        </span>
        <span class="hidden sm:flex">
          <img src="~/assets/img/dash.png" class="my-5 h-2 transform rotate-180" alt="dash.png">
        </span>
      </h2>
      <span class="flex justify-center sm:hidden">
        <img src="~/assets/img/dash.png" class="my-5 h-2" alt="dash.png">
      </span>
      <div class="grid md:grid-cols-3 gap-12 my-12 place-items-start">
        <ArticleCard v-for="article in blok.articles" :key="article.uuid" :article="article.content"
          :slug="article.full_slug" />
      </div>
    </div>
  </section>
</template>
   
<script setup>
defineProps({ blok: Object })
</script>