<script setup>
  const storyblokApi = useStoryblokApi();
  const runtimeConfig = useRuntimeConfig();

  const { data } = await storyblokApi.get('cdn/stories/config', {
    version: runtimeConfig.public.VERSION,
    resolve_links: 'url',
  });
  
  const quickLinks = ref(null);
  quickLinks.value = data.story.content.quick_links;
  const ourServices = ref(null);
  ourServices.value = data.story.content.our_services;
  const contactUs = ref(null);
  contactUs.value = data.story.content.contact_us;

  const logo = data.story.content.footer_logo?.filename || null;
  const footer_color = data.story.content?.footer_color.color;
  const footer_text_color = data.story.content?.footer_text_color.color;

  const currentYear = new Date().getFullYear();
</script>

<template>
  <footer 
    class="bg-secondary shadow p-4 text-white" 
    :style="{backgroundColor: footer_color || null, color: footer_text_color || null}"
  >
    <div class="w-full container mx-auto p-4 md:py-8">
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-10">
        <NuxtLink v-if="logo" to="/" class="flex items-center mb-4 sm:mb-0 col-span-2 sm:col-span-1">
          <img :src="logo" class="h-32" alt="Footer Logo" />
        </NuxtLink>
        <div>
          <h4 class="text-base font-semibold text-secondary">Quick Links</h4>
          <ul class="text-sm font-medium">
            <li v-for="item in quickLinks" :key="item.text" class="my-3">
              <NuxtLink :to="item.url" class="mr-4 cursor-pointer hover:underline md:mr-6">{{ item.text }}</NuxtLink>
            </li>
          </ul>
        </div>
        <!-- <div>
          <h4 class="text-base font-semibold">Our Services</h4>
          <ul class="text-sm font-medium">
            <li v-for="item in ourServices" :key="item.text" class="my-3">
              <NuxtLink :to="item.url" class="mr-4 cursor-pointer hover:underline md:mr-6">{{ item.text }}</NuxtLink>
            </li>
          </ul>
        </div> -->
        <div>
          <h4 class="text-base font-semibold text-secondary">Contact Us</h4>
          <ul class="text-sm font-medium">
            <li v-for="item in contactUs" :key="item.text" class="my-3">
              <NuxtLink :to="item.url" class="mr-4 cursor-pointer hover:underline md:mr-6">{{ item.text }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <div class="flex text-sm">
        <span class="border-r-2 pr-2">
          © kwp.co.uk {{currentYear}} 
        </span>
        <span class="border-r-2 px-2">All Rights Reserved</span>
        <NuxtLink to="/privacy-policy" class="pl-2 cursor-pointer hover:text-secondary">Privacy Policy</NuxtLink>
      </div>
    </div>
  </footer>
</template>