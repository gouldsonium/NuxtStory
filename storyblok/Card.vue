<script setup>
  const props = defineProps({ blok: Object })
  const resolvedRichText = computed(() => renderRichText(props.blok.text));

  const hovering = ref(false)
</script>

<template>
  <NuxtLink v-editable="blok" :to="blok?.url"
    @mouseover="hovering = true" @mouseleave="hovering = false"
    @touchstart="hovering = true" @touchend="hovering = false"
    class="rounded-lg px-10 py-5 flex flex-col items-center justify-between w-full h-full duration-500 cursor-pointer"
    :class="hovering ? 'text-white bg-[#10336e]' : 'bg-white'"
  >
    <div class="w-full flex flex-col justify-start items-center">
      <img :src="blok.image?.filename" :alt="blok.image?.alt" class="h-16 mb-5" :class="hovering ? 'dark-brighten' : ''">
      <h4 class="text-center font-semibold mb-5">{{ blok?.title }}</h4>
      <div :class="hovering ? 'text-white' : ''" 
      v-if="!!blok?.text" v-html="resolvedRichText" class="max-w-none prose text-center hidden lg:block"></div>    
    </div>
    <!-- <div v-if="blok?.url" class="mx-auto w-fit">
      <AppLink :to="blok?.url" class="text-center font-semibold leading-6 btn text-white px-6 py-2 text-xs sm:text-lg rounded-full hover:opacity-50">
        {{ blok?.button_text || 'Learn More' }}
      </AppLink>
    </div> -->
  </NuxtLink>
</template>