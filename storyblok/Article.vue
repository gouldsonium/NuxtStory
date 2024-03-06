<template>
  <article 
    v-editable="blok" 
    itemscope 
    itemtype="http://schema.org/Article" 
    :style="{ backgroundColor: blok.background_color?.color }"
  >
    <img
      v-if="blok.image?.filename"
      :src="blok.image.filename + '/m/1600x0'"
      alt="Article Image" itemprop="image"
      class="w-full h-[360px] lg:h-[450px] object-cover"
      :class="{ 'filter brightness-50': blok?.darken}"
    />
    <div class="container mx-auto py-8 sm:py-12 px-3 w-full">
      <h1 class="text-secondary font-bold" :style="{ color: blok.headline_teaser_color?.color }" itemprop="headline">
        {{ blok.title }}
      </h1>
      <p class="my-4">Published on <time itemprop="datePublished" :datetime="blok?.published">{{ convertDate(blok?.published) || 'N/A' }}</time></p>
      <div class="flex flex-wrap">
        <h4 itemprop="author" class="mb-4">Written by {{ blok?.author || 'Author Name' }}</h4>
      </div>
      <p class="hidden" :style="{ color: blok.headline_teaser_color?.color }">
        {{ blok.teaser }}
      </p>
      <hr class="mb-4">
      <div 
        v-html="resolvedRichText" 
        itemprop="articleBody" 
        class="prose max-w-none" 
        :class="{'prose-invert text-white': blok.invert}">
      </div>
    </div>
  </article>
</template>
   
<script setup>
  const props = defineProps({ blok: Object });
  const resolvedRichText = computed(() => renderRichText(props.blok.content));

  const description = props.blok.teaser;
  const keywords = props.blok?.keywords;

  useHead({
    meta: [
      {
        hid: 'description', // Unique identifier for Nuxt
        content: description,
        itemprop: 'description', // Add the itemprop attribute
      },
      {
        // Add the new meta object for keywords
        hid: 'keywords', // Unique identifier for Nuxt
        name: 'keywords',
        content: keywords, // Replace with your comma-separated keywords
        itemprop: 'keywords',
      },
    ],
  })

  useSeoMeta({
    title: () => props.blok.title,
    ogTitle: () => props.blok.title,
    description: () => props.blok.teaser,
    ogDescription: () => props.blok.teaser,
    ogImage: () => props.blok.image?.filename,
    ogImageWidth: () => 1200, // Set the width of your image
    ogImageHeight: () => 630, // Set the height of your image,
  });

  useServerSeoMeta({
    title: () => props.blok.title,
    ogTitle: () => props.blok.title,
    description: () => props.blok.teaser,
    ogDescription: () => props.blok.teaser,
    ogImage: () => props.blok.image?.filename,
    ogImageWidth: () => 1200, // Set the width of your image
    ogImageHeight: () => 630, // Set the height of your image
  });


  const convertDate = (dateStr) => {
    // Convert string to Date object
    const dateObj = new Date(dateStr);
    
    // Array of month names
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Get month name
    const monthName = monthNames[dateObj.getMonth()];
    
    // Get day with appropriate suffix
    const day = dateObj.getDate();
    let suffix;
    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    } else if (day === 2 || day === 22) {
        suffix = 'nd';
    } else if (day === 3 || day === 23) {
        suffix = 'rd';
    } else {
        suffix = 'th';
    }
    
    // Get year
    const year = dateObj.getFullYear();
    
    // Concatenate and return formatted date string
    const formattedDate = `${monthName} ${day}${suffix} ${year}`;
    return formattedDate;
}
</script>