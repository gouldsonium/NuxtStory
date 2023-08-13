<script setup>
  const storyblokApi = useStoryblokApi();
  const { data } = await storyblokApi.get('cdn/stories/config', {
    version: 'draft',
    resolve_links: 'url',
  });
  
  const footerMenu = ref(null);
  footerMenu.value = data.story.content.footer_menu;

  const logo = data.story.content.footer_logo?.filename || null;
  const footer_color = data.story.content?.footer_color.color;
  const footer_text_color = data.story.content?.footer_text_color.color;

  const currentYear = new Date().getFullYear();
</script>

<template>
  <footer 
    class="bg-gray-50 shadow p-4 text-gray-500" 
    :style="{backgroundColor: footer_color || null, color: footer_text_color || null}"
  >
    <div class="w-full container mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <NuxtLink v-if="logo" to="/" class="flex items-center mb-4 sm:mb-0">
          <img :src="logo" class="h-12 mr-3 dark-brighten" alt="Footer Logo" />
        </NuxtLink>
        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
          <li v-for="item in footerMenu" :key="item.text">
            <NuxtLink :to="item.url" class="mr-4 cursor-pointer hover:underline md:mr-6">{{ item.text }}</NuxtLink>
          </li>
        </ul>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <span class="block text-sm sm:text-center">© 
        {{currentYear}} Business. All Rights Reserved.
      </span>
    </div>
  </footer>
</template>