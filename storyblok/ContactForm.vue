<template>
  <section v-editable="blok" class="isolate bg-primary px-6 py-24 sm:py-32 lg:px-8" 
    :style="{backgroundColor: blok.background_color?.color}">
    <div v-if="blok.headline || blok.text" class="mx-auto max-w-2xl text-center">
      <h2 v-if="!!blok.headline" :style="{color: blok.headline_color?.color}" 
        class="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
        {{ blok?.headline }}
      </h2>
      <p v-if="!!blok.text" class="mt-2 text-lg leading-8 text-gray-900" :style="{color: blok.text_color?.color}">
        {{ blok?.text }}
      </p>
    </div>
    <form method="POST" :name="blok?.name" class="mx-auto mt-10 max-w-xl" v-on:submit.prevent="handleSubmit" 
      data-netlify="true" data-netlify-honeypot="bot-field" :action="blok?.redirect">
      <input type="hidden" name="form-name" :value="blok?.name" />
      <p hidden>
        <label>
          Don't fill this out: <input name="bot-field" />
        </label>
      </p>
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
          <div class="mt-2.5">
            <input type="email" name="email" id="email" autocomplete="email" required
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6">
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">Message</label>
          <div class="mt-2.5">
            <textarea name="message" id="message" rows="4" required
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"></textarea>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <button type="submit"
          class="block w-full rounded-md bg-secondary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:opacity-75 duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Get in touch
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
const props = defineProps({ blok: Object });

const formData = ref({ room: null });

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const router = useRouter();

const handleSubmit = (e) => {
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode({
      'form-name': e.target.getAttribute('name'),
      ...formData.value,
    }),
  })
    .then(() => router.push(props.blok?.redirect || '/'))
    .catch((error) => alert(error));
};

const formHasError = ref(false);
</script>
