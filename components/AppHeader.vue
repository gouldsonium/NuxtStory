<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { Dialog, DialogPanel } from '@headlessui/vue';
  import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';

  const storyblokApi = useStoryblokApi();
  const { data } = await storyblokApi.get('cdn/stories/config', {
    version: 'draft',
    resolve_links: 'url',
  });

  // Fetch Navbar Logo
  const logo = data.story.content.logo?.filename || null;
  
  // Define header menu as a ref
  const headerMenu = ref(null);
  headerMenu.value = data.story.content.header_menu;

  // Handle call to action button
  const CTA = data.story.content?.cta;

  const mobileMenuOpen = ref(false);

  // Handle scroll
  const isScrolled = ref(false);
  // Add scroll event listener
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  // Remove scroll event listener on component unmount
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  // Handle scroll event
  const handleScroll = () => {
    const scrollPosition = window.scrollY
    isScrolled.value = scrollPosition > 0
  }
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 transition duration-500" 
    :class="isScrolled ? 'bg-white text-gray-800': 'text-white'"
  >
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Logo</span>
          <img v-if="logo" class="h-8 sm:h-20 w-auto" :class="{ 'dark-brighten' : !isScrolled}" :src="logo" alt="Nav Logo" />
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" 
          @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex items-center lg:gap-x-12">
        <AppLink v-for="blok in headerMenu" :key="blok.name" :to="blok.url" 
          class="text-sm font-semibold leading-6 hover:text-secondary"
        >
          {{ blok.text }}
        </AppLink>
        <StoryblokComponent
          class="text-sm"
          v-for="blok in CTA"
          :key="blok._uid"
          :blok="blok"
        />
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50" />
      <DialogPanel 
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="-m-1.5 p-1.5" @click="mobileMenuOpen = false">
            <span class="sr-only">Logo</span>
            <img class="h-8 sm:h-16 w-auto dark-brighten" :src="logo" alt="Mobile Nav Logo" />
          </NuxtLink>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <AppLink v-for="link in headerMenu" :key="link.name" :to="link.url" @click="mobileMenuOpen = false" 
                class="-mx-3 rounded-lg px-4 py-2 text-base font-semibold leading-7 block text-gray-900 hover:opacity-50 duration-500"
                >
                {{ link.text }}
              </AppLink>
              <StoryblokComponent
                class="text-base w-auto"
                v-for="blok in CTA"
                :key="blok._uid"
                :blok="blok"
              />
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<style scoped>
.dark-brighten{
  filter: brightness(0) invert(1);
}
</style>