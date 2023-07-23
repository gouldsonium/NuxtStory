<script setup>
  // import { ref, onMounted, onUnmounted } from 'vue';
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
  const callToAction = data.story.content?.cta[0];
  const buttonBackgroundColor = ref(callToAction.btn_color?.color);
  const buttonTextColor = ref(callToAction.text_color?.color);

  const btnClasses = [
    callToAction.style,
    callToAction.hover == 'fade' ? 'hover:opacity-50' : ''
  ]

  const changeBackgroundColor = () => {
    if(callToAction.hover == 'flip'){
      buttonBackgroundColor.value = callToAction.text_color?.color;
      buttonTextColor.value = callToAction.btn_color?.color;
    } else if(callToAction.hover == 'transparent'){
      buttonBackgroundColor.value = '#ffffff00'
    }
  };

  const changeBackgroundBack = () => {
    buttonBackgroundColor.value = callToAction.btn_color?.color;
    buttonTextColor.value = callToAction.text_color?.color;
  }

  // handle headers colors and scroll behaviour
  const showBackground = !data.story.content.background_on_scroll;
  const header_color = data.story.content?.header_color.color;
  const header_text_color = data.story.content?.header_text_color.color;

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
    :class="{'bg-white': isScrolled || showBackground}" 
    :style="isScrolled || showBackground ? { backgroundColor: header_color} : ''"
  >
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Logo</span>
          <img v-if="logo" class="h-8 sm:h-20 w-auto dark-brighten" :src="logo" alt="Logo" />
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button type="button" :style="{color: header_text_color}" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex items-center lg:gap-x-12">
        <AppLink v-for="blok in headerMenu" :key="blok.name" :to="blok.url" 
          class="text-sm font-semibold leading-6 transition duration-300 text-gray-900 hover:text-secondary"
          :style="{color: header_text_color}"
        >
          {{ blok.text }}
        </AppLink>
        <AppLink v-if="callToAction.url && callToAction.text" :to="callToAction?.url" 
          :class="btnClasses" class="text-sm font-semibold leading-6 btn" 
          :style="{
            backgroundColor: buttonBackgroundColor, color: buttonTextColor, 
            border:`${callToAction.btn_color?.color} solid 2px`
          }"
          @mouseover="changeBackgroundColor('#e0e0e0')" @mouseout="changeBackgroundBack"
        >
          {{ callToAction?.text }}
        </AppLink>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50" />
      <DialogPanel 
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        :style="{ backgroundColor: header_color}"
      >
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="-m-1.5 p-1.5" @click="mobileMenuOpen = false">
            <span class="sr-only">Logo</span>
            <img class="h-8 sm:h-16 w-auto dark-brighten" :src="logo" alt="Logo" />
          </NuxtLink>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false" :style="{color: header_text_color}">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <AppLink v-for="link in headerMenu" :key="link.name" :to="link.url" @click="mobileMenuOpen = false" 
                class="-mx-3 rounded-lg px-4 py-2 text-base font-semibold leading-7 block text-gray-900 hover:opacity-50 duration-500"
                :style="{color: header_text_color}"
                >
                {{ link.text }}
              </AppLink>
              <AppLink
                v-if="callToAction.url && callToAction.text" :class="btnClasses"
                :to="callToAction.url" class="inline-block -mx-0 rounded-lg text-base font-semibold leading-7 btn" 
                :style="{backgroundColor: buttonBackgroundColor, color: buttonTextColor}"
              >
                {{ callToAction.text }}
              </AppLink>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<style scoped>
nav a.router-link-active {
  @apply text-secondary !important
}

</style>