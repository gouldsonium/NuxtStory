<template>
  <div v-editable class="w-fit" :class="{ 'my-5' : blok?.spacing, 'mx-auto' : blok?.center}">
    <AppLink v-if="blok?.url" :to="blok?.url" class="font-semibold leading-6 btn text-center font-heading"
      :class="{'hover:opacity-50' : blok.hover == 'fade'}, blok?.font_size, blok?.padding"  
      :style="{
        backgroundColor: buttonBackgroundColor, color: buttonTextColor,
        border:`${blok.btn_color?.color} solid 2px`, borderRadius: blok.style
      }"
      @mouseover="changeBackgroundColor" @mouseout="changeBackgroundBack"
    >
      {{ blok?.text || 'Example Button' }}
    </AppLink>
  </div>
</template>

<script setup>
  const props = defineProps({ blok: Object });
  
  let buttonBackgroundColor = ref(props.blok.btn_color?.color);
  let buttonTextColor = ref(props.blok.text_color?.color);
  // For editor so colors change
  watch(() => props.blok, () => {
    buttonBackgroundColor.value = props.blok?.btn_color?.color;
    buttonTextColor.value = props.blok?.text_color?.color;
  });
  
  const changeBackgroundColor = () => {
    if(props.blok.hover == 'flip'){
      buttonBackgroundColor.value = props.blok.text_color?.color;
      buttonTextColor.value = props.blok.btn_color?.color;
    } else if(props.blok.hover == 'transparent'){
      buttonBackgroundColor.value = '#ffffff00';
      buttonTextColor.value = props.blok.btn_color?.color;
    }
  };

  const changeBackgroundBack = () => {
    buttonBackgroundColor.value = props.blok.btn_color?.color;
    buttonTextColor.value = props.blok.text_color?.color;
  };
</script>