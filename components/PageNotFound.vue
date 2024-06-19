<template>
  <section>
    <div class="image-box min-h-screen">
      <img src="/404.avif" alt="Background Image" class="img-background brightness-50 min-h-full" />
      <div class="grid grid-cols-1 lg:grid-cols-3 z-10 w-full py-6 sm:px-5 min-h-full container py-48">
        <div class="text-white flex flex-col justify-center px-8 sm:px-24 lg:col-span-2">
          <h1 class="mb-3 z-30 text-white text-7xl font-heading">404</h1>
          <p class="font-light z-30 text-gray-200 text-xl">Page not found</p>
          <div class="w-fit my-5">
            <AppLink to="/" class="font-semibold leading-6 btn text-center hover:opacity-50 px-6 py-3 font-heading">
              Back Home
            </AppLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.image-box{
  width: 100%;
  display: flex;
  justify-content: center;
}

.img-background {
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 800px;
  object-fit: cover; /* Zoom in while preserving aspect ratio */
}
</style>

