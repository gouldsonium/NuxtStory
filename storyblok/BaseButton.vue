<template>
  <div v-editable class="inline-block">
    <AppLink :to="blok?.url" 
      :class="btnClasses" class="font-semibold leading-6 btn" 
      :style="{
        backgroundColor: buttonBackgroundColor, color: buttonTextColor, 
        border:`${blok.btn_color?.color} solid 2px`, borderRadius: blok.style
      }"
      @mouseover="changeBackgroundColor" @mouseout="changeBackgroundBack"
    >
      {{ blok?.text }}
    </AppLink>
  </div>
</template>

<script setup>
  const props = defineProps({ blok: Object });
  const btnClasses = [
    props.blok.style,
    props.blok.hover == 'fade' ? 'hover:opacity-50' : ''
  ]

  const buttonBackgroundColor = ref(props.blok.btn_color?.color);
  const buttonTextColor = ref(props.blok.text_color?.color);

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
  }
</script>