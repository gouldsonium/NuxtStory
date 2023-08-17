<script setup>
  const props = defineProps({ blok: Object })
  const resolvedRichText = computed(() => renderRichText(props.blok.text));
</script>

<template>
  <div v-editable="blok" class="relative bg-white rounded-lg px-10 py-5 flex flex-col items-start justify-between w-full h-full overflow-hidden"
  style="box-shadow: 0 0 2px 2px #00000020">
    <img src="~/assets/img/5stars.png" alt="5 stars">
    <div class="bg-[#10336e] absolute right-0 top-0 rounded-bl-full flex justify-end items-center h-16 w-16">
      <img class="h-8 mr-2 mb-2" style="filter: brightness(0) invert(1);" src="~/assets/img/quotation.png" alt="quatation">
    </div>
    <div v-if="!!blok?.text" v-html="resolvedRichText" class="max-w-none prose my-5"></div>    
    <div>
      <h4 class="text-secondary text-lg">{{ blok?.author }}, <span class="text-[#10336e]">{{ blok?.title }}</span></h4>
    </div>
  </div>
</template>