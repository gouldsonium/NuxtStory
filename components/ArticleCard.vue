<template>
    <NuxtLink
      :to="'/' + slug"
      v-editable="article"
      class="w-full h-full bg-gray-200 border-secondary border rounded-[5px] text-center overflow-hidden"
    >
      <img
        :src="article.image.filename + '/m/600x0'"
        :alt="article.image.alt"
        class="w-full h-48 xl:h-72 object-cover pointer-events-none"
      />
      <div class="p-4">
        <h3 class="text-xl text-gray-900 font-bold mb-3">
          {{ article.title }}
        </h3>
        <div class="line-clamp-4 text-gray-700">
          {{ article.teaser }}
        </div>
      </div>
    </NuxtLink>
</template>
   
<script setup>
  defineProps({ article: Object, slug: String })
</script>