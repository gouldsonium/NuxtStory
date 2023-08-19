<script setup>
  const props = defineProps({ blok: Object })
</script>

<template>
  <div class="mx-auto bg-gray-100 rounded-lg p-10 max-w-5xl">
    <h6 class="text-center mb-5">{{ blok?.text }}</h6>
    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
      <div>
        <label for="email" class="block text-sm leading-6">Email</label>
        <div class="mt-2.5">
          <input type="email" name="email" id="email" autocomplete="email" placeholder="johnsmith@gmail.com" />
        </div>
      </div>
      <div>
        <label for="country" class="block text-sm leading-6">Country of Residence</label>
        <div class="mt-2.5">
          <input type="text" name="country" id="country" autocomplete="country" placeholder="Switzerland" />
        </div>
      </div>
      <div class="w-full">
        <label for="country" class="block text-sm leading-6 opacity-0">BTN</label>
        <button type="submit" class="mt-2.5 w-full btn py-2 rounded-full border-none hover:opacity-75"
        style="font-family: 'Cinzel', serif;">
          SIGN UP TODAY
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
input{
  @apply block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6
}
</style>