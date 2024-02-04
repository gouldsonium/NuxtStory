<template>
  <section class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" style="">
    <div class="mt-36 sm:mx-auto sm:w-full sm:max-w-3xl bg-white p-10 rounded-lg">
      <div class="sm:mx-auto sm:w-full sm:max-w-3xl">
        <img class="mx-auto h-36 w-auto" src="https://a.storyblok.com/f/272338/5098x5336/3a2be38bf6/png.png"
          alt="KWP">
      </div>
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-secondary hover:text-secondary">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">Sign
            in</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <NuxtLink to="/contact" class="font-semibold leading-6 text-secondary hover:text-secondary">Get in touch</NuxtLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
  section{
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://a.storyblok.com/f/272338/4460x2973/fa8e14dd74/burst-kuqqarjjuw0-unsplash.jpg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
