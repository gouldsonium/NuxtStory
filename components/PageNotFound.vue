<script setup>
  // Define the computed property for the background image style
  const imageBoxStyle = computed(() => {
    return {
      backgroundImage: `linear-gradient(to right, #22283180, #22283180), url(https://a.storyblok.com/f/247081/940x624/d74e27f7b8/mountains-2.png)`,
      visibility: 'visible',
      backgroundColor: '#ffffff'
    };
  });
</script>

<template>
  <section class="out-box mb-5">
    <div class="shape-box">
      <div class="image-box" :style="imageBoxStyle">
        <div class="grid grid-cols-1 lg:grid-cols-3 z-10 w-full py-6 px-5 min-h-full container py-48">
          <div class="text-white flex flex-col justify-center px-16 sm:px-24 lg:col-span-2">
            <h1 class="font-bold mb-3 uppercase">404 Page Not Found</h1>
            <p class="font-light">The page you are trying to access does not exist. To navigate back to the home page, click the button below.</p>
            <div class="mt-10 flex">
            <AppLink to="/" class="font-semibold leading-6 btn text-center hover:opacity-50 text-lg px-6 py-2 rounded-full">
              Go to home page
            </AppLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Add a style rule to control the image visibility */

.out-box{
  width: 100%;
  overflow: hidden;
}
.shape-box{
	border-bottom-left-radius: 100% 250px;
	border-bottom-right-radius: 100% 250px;
	width: calc(100% + 100px) ;
	margin-left: -50px;
  overflow: hidden;
  border-bottom: solid 20px #00ccff;
}
.image-box{
  min-height: 700px;
  width: 100%;
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
}

</style>

