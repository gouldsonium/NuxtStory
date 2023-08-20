<script setup lang="ts">
  const props = defineProps({
    title: String,
    description: String,
  });
</script>

<template>
  <div
    style="position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; background: white; color: black; align-items: center; justify-content: center;">
    <div style="position: absolute; top: 4rem; left: 4rem;">
      <img width="125" height="87" src="https://a.storyblok.com/f/247081/513x356/210de78197/rosbotham-logo.png" 
      style="" alt="Rosbotham Logo" />
    </div>
    <h1
      style="max-width: 80%; font-size: 4.375rem; text-align: center; color: #00ccff; margin-bottom: 25px;">
      {{ title }}
    </h1>
    <p style="font-size: 2rem; max-width: 80%; color: #10336e;">{{ description }}</p>
    <div style="display: flex; align-items: center; position: absolute; bottom: 4rem; right: 4rem;">
      <img src="https://i.imgur.com/sFdtpA6.png"
        style="border-radius: 50%; height: 6rem; width: 6rem; margin-right: 1rem; object-fit: cover;" />
      <div>
        <p style="font-size: 2rem; font-weight: 600; color: #10336e;">David Rosbotham</p>
        <p style="font-size: 1.5rem;">Founder</p>
      </div>
    </div>
  </div>
</template>
