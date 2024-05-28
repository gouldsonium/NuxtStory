<script setup>
import { ref } from 'vue';
import axios from 'axios';
import MarkdownIt from 'markdown-it';

const props = defineProps({ blok: Object });
const githubUrl = props.blok?.markdown_url;
const readmeContent = ref('');

const fetchMarkdown = async () => {
  try {
    const { data } = await axios.get(githubUrl);
    readmeContent.value = data;
  } catch (error) {
    console.error('Error fetching markdown content:', error);
  }
};

fetchMarkdown();

const renderMarkdown = (content) => {
  const md = new MarkdownIt();
  return md.render(content);
};

const renderedContent = computed(() => renderMarkdown(readmeContent.value));
</script>

<template>
  <div>
    <div class="markdown-body font-text text-gray-800 dark:text-gray-100" v-if="readmeContent" v-html="renderedContent" />
  </div>
</template>

<style scoped>
/* :deep(.markdown-body table) {
  background-color: black !important;
  color: white !important;
} */
:deep(.markdown-body tr) {
  background-color:  transparent !important;
}
</style>
