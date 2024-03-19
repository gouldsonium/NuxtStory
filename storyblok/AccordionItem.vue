<template>
  <div v-editable="blok" class="border-t-2 border-secondary" :style="{borderColor: blok?.border_color.color || '#000000'}">
    <button @click="toggleAccordion" :aria-expanded="isOpen" :aria-controls="`collapse${blok._uid}`">
      <h4 class="text-left hover:text-secondary duration-300 py-5 font-heading" :style="{color:blok?.title_color.color}">
        {{ blok?.title }}
      </h4>
      <svg fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" aria-hidden="true"
        class="icon" :class="{'rotate-180': isOpen, 'rotate-0': !isOpen}" :style="{color:blok?.title_color.color}">
        <path d="M15 1.2l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <Transition name="fade">
      <article v-if="isOpen" :id="`collapse${blok._uid}`">
        <p :style="{color:blok?.text_color.color}" class="pb-4">{{ blok?.content }}</p>
        <div class="w-fit">
          <AppLink v-if="!!blok?.url" :to="blok?.url" class="mb-4 text-center font-semibold leading-6 btn text-white px-6 py-2 text-xs sm:text-lg rounded-full hover:opacity-50">
            {{ blok?.button_text || 'Learn More' }}
          </AppLink>
        </div>
      </article>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Transition } from 'vue';

const props = defineProps({ blok: Object })
const isOpen = ref(false);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>

  
<style scoped>
  .rotate-180{
    transform: rotate(180deg);
  }
  .icon{
    height: 15px;
    margin-left: 5px;
    transition: all 0.3s;
  }
  button{
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    color: black;
  }
  
  article{
    transition: all 0.3s;
    transition-delay: 0.3s;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>