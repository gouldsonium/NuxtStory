<script setup>
  const props = defineProps({to: String,});
  const useNuxt = props.to[0] == '/' ? true : false;
</script>

<template>
  <NuxtLink v-if="useNuxt" :to="to">
    <slot></slot>
  </NuxtLink>
  <a v-else :href="to" target="_blank">
    <slot></slot>
  </a>
</template>