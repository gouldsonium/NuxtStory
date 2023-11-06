<script setup>
  const props = defineProps({ blok: Object });
  const resolvedRichText = computed(() => renderRichText(props.blok.text));

    // For the background style object
  const hasBackgroundImage = computed(() => {return !!props.blok.background_image?.filename});  
  const hasBackgroundColor = computed(() => {return !!props.blok.background_color?.color});

  const backgroundStyle = computed(() => {
    if (hasBackgroundImage.value && props.blok?.darken_background_image) {
      return {
        backgroundImage: `linear-gradient(to right, #22283180, #22283180), url(${props.blok.background_image.filename})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      };
    } else if (hasBackgroundImage.value) {
      return {
        backgroundImage: `url(${props.blok.background_image.filename})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      };
    }

    if(hasBackgroundColor.value){
      return {backgroundColor: props.blok.background_color?.color}
    }

    return null;
  });

</script>

<template>
  <section v-editable="blok" :style="backgroundStyle" class="w-full bg-primary px-6 lg:px-12 py-24">
    <div :class="blok?.layout">
      <h2 v-if="!!blok?.title" class="font-bold flex items-center uppercase" :style="{color: blok.title_color?.color}"
      :class="{'text-center justify-center' : blok?.text_center}">
        <span class="hidden sm:flex">
          <img v-if="blok?.text_center" src="~/assets/img/dash.png" class="my-5 h-2" alt="dash.png">
        </span>
        <span :class="{'sm:mx-3' : blok?.text_center}">
          {{ blok?.title }}
        </span>
        <span class="hidden sm:flex">
          <img v-if="blok?.text_center" src="~/assets/img/dash.png" class="my-5 h-2 transform rotate-180" alt="dash.png">
        </span>
      </h2>
      <span class="flex justify-center sm:hidden" v-if="!!blok?.title">
        <img src="~/assets/img/dash.png" class="my-5 h-2" alt="dash.png">
      </span>
      <div 
        v-if="!!blok?.text" v-html="resolvedRichText" class="max-w-none prose my-10" 
        :class="{ 'prose-invert text-white': blok.invert, 'sm:text-center' : blok?.text_center}">
      </div>
      <div class="my-5">
        <StoryblokComponent v-for="blok in blok.content" :key="blok._uid" :blok="blok" class="relative" />
      </div>
    </div>
  </section>
</template>
