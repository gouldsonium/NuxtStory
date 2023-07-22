<script setup>
  const storyblokApi = useStoryblokApi();
  const { data } = await storyblokApi.get('cdn/stories/config', {
    version: 'draft',
    resolve_links: 'url',
  });
  
  const footerMenu = ref(null);
  footerMenu.value = data.story.content.footer_menu;
  const logo = data.story.content.footer_logo?.filename || null;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
</script>

<template>
  <footer class="bg-gray-50 shadow dark:bg-gray-900 p-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <NuxtLink v-if="logo" to="/" class="flex items-center mb-4 sm:mb-0">
          <img :src="logo" class="h-12 mr-3 dark-brighten" alt="Footer Logo" />
        </NuxtLink>
        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
          <li v-for="item in footerMenu" :key="item.text">
            <NuxtLink :to="item.url" class="mr-4 cursor-pointer hover:underline md:mr-6">{{ item.text }}</NuxtLink>
          </li>
        </ul>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 
        {{currentYear}} Business. All Rights Reserved.
      </span>
    </div>
  </footer>
</template>
  
<style scoped>
@media (prefers-color-scheme: dark) {
  .dark-brighten {
    filter: brightness(0) invert(1);
  }
}
</style>