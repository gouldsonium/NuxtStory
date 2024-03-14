<script setup>
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';

const props = defineProps({ blok: Object });
const resolvedRichText = computed(() => renderRichText(props.blok.text));

const agreed = ref(false);

const first_name = ref('');
const last_name = ref('');
const email = ref('');
const phone = ref('');
const message = ref('');

const resetForm = () => {
  first_name.value = '';
  last_name.value = '';
  phone.value = '';
  email.value = '';
  message.value = '';
}

const encode = (data) => {
  return Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
}

const submitForm = async () => {
  if (agreed.value == false) {
    window.alert("Please agree to our privacy policy");
    return;
  }

  const formData = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    phone: phone.value,
    description: message.value,
  };

  try {
    // const res = await axios.post(API + '/book', body);
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({'form-name': "Contact", ...formData})
      }).then(() => console.log('Success')).catch(error => alert(error));
    await navigateTo({ path: '/success' });
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
</script>

<template>
  <section :style="{ backgroundColor: blok.background_color?.color }" class="px-6 lg:px-8 py-24 sm:py-32 relative">
    <div class="text-center">
      <h2 class="font-semibold font-heading">{{ blok?.title || 'Get in touch' }}</h2>
      <div v-if="!!blok?.text" v-html="resolvedRichText" class="max-w-none prose my-5"
        :class="{ 'prose-invert text-white': blok.invert, 'text-center': blok?.text_center }"></div>
    </div>
    <div>
      <form method="POST" action="/success" class="mx-auto max-w-xl" name="contact" netlify>
        <input type="hidden" name="form-name" value="contact" />
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label for="first-name" class="block text-sm font-semibold leading-6">First name</label>
            <div class="mt-2.5">
              <input required type="text" name="first-name" id="first-name" autocomplete="given-name" v-model="first_name"
                class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="last-name" class="block text-sm font-semibold leading-6">Last name</label>
            <div class="mt-2.5">
              <input required type="text" name="last-name" id="last-name" autocomplete="family-name" v-model="last_name"
                class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-semibold leading-6">Email</label>
            <div class="mt-2.5">
              <input required type="email" name="email" id="email" autocomplete="email" v-model="email"
                class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="phone-number" class="block text-sm font-semibold leading-6">Phone number</label>
            <div class="mt-2.5">
              <input required type="text" name="phone-number" id="phone-number" autocomplete="tel" v-model="phone"
                class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="message" class="block text-sm font-semibold leading-6">Message</label>
            <div class="mt-2.5">
              <textarea name="message" id="message" rows="4" v-model="message"
                class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary  sm:text-sm sm:leading-6" />
            </div>
          </div>
          <SwitchGroup as="div" class="flex gap-x-4 sm:col-span-2">
            <div class="flex h-6 items-center">
              <Switch v-model="agreed"
                :class="[agreed ? 'bg-secondary' : 'bg-gray-200', 'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600']">
                <span class="sr-only">Agree to policies</span>
                <span aria-hidden="true"
                  :class="[agreed ? 'translate-x-3.5' : 'translate-x-0', 'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out']" />
              </Switch>
            </div>
            <SwitchLabel class="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our
              {{ ' ' }}
              <NuxtLink to="/privacy-policy" class="font-semibold text-secondary">privacy&nbsp;policy</NuxtLink>.
            </SwitchLabel>
          </SwitchGroup>
        </div>
        <div class="mt-10 w-full">
          <button type="submit" class="w-full btn py-2 rounded-lg border-none hover:opacity-75 bg-secondary">
            Get in touch
          </button>
        </div>
      </form>
    </div>
  </section>
</template>