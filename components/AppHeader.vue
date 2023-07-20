<script setup>
  const storyblokApi = useStoryblokApi()
  const { data } = await storyblokApi.get('cdn/stories/config', {
    version: 'draft',
    resolve_links: 'url',
  })
  
  const headerMenu = ref(null)
  headerMenu.value = data.story.content.header_menu
  console.log(headerMenu)
</script>

<template>
  <header class="w-full h-24 bg-primary">
    <div class="container h-full mx-auto flex items-center justify-between">
      <NuxtLink to="/">
        <h1 class="text-secondary text-3xl font-bold">Storyblok Nuxt</h1>
      </NuxtLink>
      <nav v-if="headerMenu">
        <ul class="flex space-x-8 text-lg font-bold text-white">
          <li v-for="blok in headerMenu" :key="blok._uid">
            <NuxtLink :to="`/${blok.url}`">
              {{ blok.text }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
nav a.router-link-active {
  @apply underline underline-offset-4 decoration-2 decoration-secondary;
}
</style>