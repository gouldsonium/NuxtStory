<script setup>
  const props = defineProps({ blok: Object });
</script>

<template>
  <div class="mx-auto max-w-5xl p-2 -mb-32 sm:-mb-52 rounded-lg bg-white" v-editable="blok" style="box-shadow: 0 0 2px 2px #00000020">
    <!-- <StoryblokComponent v-for="blok in blok.content" :key="blok._uid" :blok="blok" /> -->
    <img src="~/assets/img/certified.png" alt="certified.png">
  </div>
</template>