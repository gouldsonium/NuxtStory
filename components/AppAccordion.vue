<template>
  <div class="accordion-item">
    <button @click="toggleAccordion" :aria-expanded="isOpen" :aria-controls="`collapse${_uid}`">
      <h3 class="accordion-title">{{ title }}</h3>
      <svg fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" aria-hidden="true"
        class="icon" :class="{'rotate-180': isOpen, 'rotate-0': !isOpen}">
        <path d="M15 1.2l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <Transition name="fade">
      <article v-if="isOpen" :id="`collapse${_uid}`">
        <p class="font-open">{{ content }}</p>
      </article>
    </Transition>
  </div>
</template>

<script>
export default {
  props: ['title', 'content'],
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.rotate-180{
  transform: rotate(180deg);
}
.accordion-item{
  border-top: 2px solid white;
}
.accordion-title{
  font-family: 'JetBrains Mono', monospace;
  text-align: left;
}
.accordion-title:hover{
  color: white;
  transition: .3s ease;
}
.icon{
  height: 20px;
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
  padding: 1px 6px;
}
p{
  margin: 0;
  padding-bottom: 15px;
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