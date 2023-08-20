<template>
  <div v-editable="blok" class="mx-auto bg-gray-100 rounded-lg p-10 max-w-5xl">
    <h6 class="text-center mb-5">{{ blok?.text }}</h6>
    <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
      <div>
        <label for="email" class="block text-sm leading-6">Email</label>
        <div class="mt-2.5">
          <input
            required
            v-model="email"
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            placeholder="johnsmith@gmail.com"
            class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label for="country" class="block text-sm leading-6">Country of Residence</label>
        <div class="mt-2.5">
          <input
            required
            v-model="country"
            type="text"
            name="country"
            id="country"
            autocomplete="country"
            placeholder="Switzerland"
            class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="w-full">
        <label for="country" class="block text-sm leading-6 opacity-0">BTN</label>
        <button
          class="mt-2.5 w-full py-2 rounded-full border-none hover:opacity-75 btn"
          style="font-family: 'Cinzel', serif;"
        >
          SIGN UP TODAY
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['blok'],
  setup() {
    const email = ref('');
    const country = ref('');

    const submitForm = async () => {
      let leadSource;
      // Ensure it runs on client side
      if (process.client) {
        leadSource = localStorage.getItem('source');
      }
      const API = process.env.NODE_ENV == 'development' ? 'http://localhost:3001' : 'https://api.rosbothamfinance.com'
      try {
        await axios.post(API + '/subscribe', {
          email: email.value,
          country: country.value,
          lead_source: leadSource
        });

        window.alert("Thanks for subscribing");
        email.value = '';
        country.value = '';

      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    return {
      email,
      country,
      submitForm,
    };
  },
};
</script>
