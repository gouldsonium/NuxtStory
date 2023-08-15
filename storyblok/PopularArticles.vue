<template>
  <div class="py-24 px-3" :style="{backgroundColor: blok.background_color?.color}">
    <h2 v-if="!!blok?.headline" :style="{color: blok.headline_color?.color}"
      class="font-bold text-secondary mb-10 flex text-center justify-center items-center">
      <span>
        <img v-if="blok?.headline" src="~/assets/img/dash.png" class="my-5 h-2" alt="dash.png">
      </span>
      <span class="mx-3">
        {{ blok?.headline }}
      </span>
      <span>
        <img v-if="blok?.headline" src="~/assets/img/dash.png" class="my-5 h-2 transform rotate-180" alt="dash.png">
      </span>
    </h2>
    <div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">
      <ArticleCard
        v-for="article in blok.articles"
        :key="article.uuid"
        :article="article.content"
        :slug="article.full_slug"
      />
    </div>
  </div>
</template>
   
<script setup>
  defineProps({ blok: Object })
</script>