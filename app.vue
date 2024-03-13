<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
export default {
  created() {
    if (process.client) {
      const sourceValue = this.$route.query.source;

      if (sourceValue) {
        // Store the 'source' value in local storage
        localStorage.setItem('source', sourceValue);
      }
    }
  },
};
</script>