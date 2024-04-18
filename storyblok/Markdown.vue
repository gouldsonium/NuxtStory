<script setup>
import axios from 'axios';
import MarkdownIt from 'markdown-it';
const props = defineProps({ blok: Object });
const githubUrl = props.blok?.markdown_url;
const { data: readmeContent } = await axios.get(githubUrl);

const renderMarkdown = (content) => {
  const md = new MarkdownIt();
  return md.render(content);
};

const renderedContent = renderMarkdown(readmeContent);
</script>

<template>
  <div>
    <div class="markdown-body font-text" v-if="readmeContent" v-html="renderedContent" />
  </div>
</template>