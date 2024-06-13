<script setup>
  const props = defineProps({ blok: Object });
  const resolvedRichText = computed(() => renderRichText(props.blok.text));

  // For the background style object
  const hasBackgroundImage = computed(() => !!props.blok.background_image?.filename);
  const hasBackgroundColor = computed(() => !!props.blok.background_color?.color);

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

    if (hasBackgroundColor.value) {
      return { backgroundColor: props.blok.background_color?.color };
    }

    return null;
  });
</script>

<template>
  <div :id="blok?.section_id" style="position: relative; visibility: hidden;" class="md:top-[-100px]"></div>
  <section v-editable="blok" :style="backgroundStyle" :class="{'py-16' : !!blok?.padding}" class="bg-gray-100 dark:bg-gray-800">
    <div :class="blok?.layout" data-aos="fade-up">
      <h2 v-if="!!blok?.title" class="font-semibold flex items-center mb-5 font-heading text-gray-800 dark:text-gray-100" :style="{color: blok.title_color?.color}"
      :class="{'text-center justify-center' : blok?.text_center}">
        <span :class="{'sm:mx-3' : blok?.text_center}">
          {{ blok?.title }}
        </span>
      </h2>
      <div 
        v-if="!!resolvedRichText" v-html="resolvedRichText" class="max-w-none prose mb-5 text-gray-800 dark:text-gray-100" 
        :class="{'prose-invert text-white': blok.invert, 'text-center' : blok?.text_center}">
      </div>
      <div>
        <StoryblokComponent v-for="blok in blok.content" :key="blok._uid" :blok="blok" class="relative" />
      </div>
    </div>
  </section>
</template>
