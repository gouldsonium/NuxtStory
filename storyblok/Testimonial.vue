<script setup>
  const props = defineProps({ blok: Object });

  const isMobile = ref(false);
  const expanded = ref(false);

  const toggleExpand = () => {
    if (isMobile.value) {
      expanded.value = !expanded.value;
    }
  };

  // Detect if the viewport is mobile
  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 640;
  };

  onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
  });
</script>

<template>
  <div
    v-editable="blok"
    class="relative bg-white rounded-lg p-5 flex flex-col items-start justify-between w-full h-full overflow-hidden"
    style="box-shadow: 0 0 2px 2px #00000020"
  >
    <img class="h-8" src="~/assets/img/5stars.png" alt="5 stars" />
    <div
      class="bg-[#10336e] absolute right-0 top-0 rounded-bl-full flex justify-end items-center h-8 w-8 sm:h-16 sm:w-16"
    >
      <img
        class="h-4 sm:h-8 mr-2 mb-2"
        style="filter: brightness(0) invert(1);"
        src="~/assets/img/quotation.png"
        alt="quatation"
      />
    </div>
    <p
      v-if="!!blok?.text"
      class="mt-5"
      :class="{ 'max-lines-1 text-truncate': isMobile && !expanded }"
      @click="toggleExpand"
    >
      {{ blok?.text }}
    </p>
    <p @click="toggleExpand" v-if="isMobile && !expanded" class="text-secondary underline cursor-pointer">READ MORE</p>
    <div class="mt-5">
      <h4 class="text-secondary text-xs sm:text-lg">
        {{ blok?.author }}, <span class="text-[#10336e]">{{ blok?.title }}</span>
      </h4>
    </div>
  </div>
</template>

<style scoped>
.text-truncate {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.max-lines-1 {
  max-height: 1.2rem; /* About 4 lines of text */
}
</style>
