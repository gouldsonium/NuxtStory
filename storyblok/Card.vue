<script setup>
  const props = defineProps({ blok: Object })
  const resolvedRichText = computed(() => renderRichText(props.blok.text));
</script>

<template>
  <div v-editable="blok" class="bg-white rounded-lg px-10 py-5 flex flex-col items-center justify-between w-full h-full">
    <div class="w-full flex flex-col justify-start items-center">
      <img :src="blok.image?.filename" :alt="blok.image?.alt" class="h-16 mb-5">
      <h4 class="text-center font-semibold">{{ blok?.title }}</h4>
      <div v-if="!!blok?.text" v-html="resolvedRichText" class="max-w-none prose my-5 text-center"></div>    
    </div>
    <div v-if="blok?.url" class="mx-auto w-fit">
      <AppLink :to="blok?.url" class="font-semibold leading-6 btn text-white px-6 py-2 text-lg rounded-full hover:opacity-50"  
      :style="{fontFamily: 'Poppins'}"
    >
      {{ blok?.button_text || 'Learn More' }}
    </AppLink>
    </div>
  </div>
</template>