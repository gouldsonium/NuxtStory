<template>
  <NuxtLink
    :to="'/' + slug"
    v-editable="article"
    class="w-full h-full bg-white rounded-r-[45px] rounded-b-[0] text-center overflow-hidden border-b-secondary border-b-4 hover:scale-110 duration-500"
  >
    <img
      v-if="!!article?.image"
      :src="article?.image?.filename + '/m/600x0'"
      :alt="article?.image.alt"
      class="w-full h-48 xl:h-72 object-cover pointer-events-none"
    />
    <div class="p-4 border h-full border-secondary border-t-0">
      <h3 class="text-xl text-gray-900 font-bold mb-3 font-heading">
        {{ article.title }}
      </h3>
      <div class="line-clamp-4 text-gray-700">
        {{ article.teaser }}
      </div>
      <div class="py-5 text-center font-semibold">
        <p class="text-secondary flex justify-center">Read More
          <span class="text-secondary ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </span> 
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
   
<script setup>
  defineProps({ article: Object, slug: String })
</script>