<script setup>
  const props = defineProps({ blok: Object })
  const resolvedRichText = computed(() => renderRichText(props.blok.text));
</script>

<template>
  <div v-editable="blok" class="bg-white rounded-lg px-10 py-5 flex flex-col items-start justify-between w-full h-full"
  style="box-shadow: 0 0 2px 2px #00000020">
    <div v-if="!!blok?.text" v-html="resolvedRichText" class="max-w-none prose my-5"></div>    
    <div>
      <h4 class="text-secondary text-lg">{{ blok?.author }}, <span class="text-[#10336e]">{{ blok?.title }}</span></h4>
    </div>
  </div>
</template>