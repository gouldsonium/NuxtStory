<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
export default {
  created() {
    if (process.client) {
      // Get the value of the 'source' query parameter from the URL
      const sourceValue = this.$route.query.source;

      if (sourceValue) {
        // Store the 'source' value in local storage
        localStorage.setItem('source', sourceValue);
      }
    }
  },
};
</script>
