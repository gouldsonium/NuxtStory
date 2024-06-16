const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const storyblokApi = axios.create({
  baseURL: !!process.env.STORYBLOK_REGION 
  ? `https://api-${process.env.STORYBLOK_REGION}.storyblok.com/v2/cdn` : 'https://api.storyblok.com/v2/cdn',
  headers: {
    'Content-Type': 'application/json',
  },
});

async function generateSitemap() {
  try {
    const response = await storyblokApi.get(`/stories?token=${process.env.STORYBLOK_ACCESS_TOKEN}`);

    const urls = response.data.stories.filter(story => story.full_slug !== 'config' && !story.content.sitemap_ignore).map((story) => {
      const adjustedSlug = story.full_slug.startsWith('home') ? '' : story.full_slug;
        return {
          loc: `${process.env.WEBSITE_URL}/${adjustedSlug}`, // Replace with your domain
          lastmod: story.published_at, // Use story creation date as last modified
          changefreq: 'weekly', // Adjust frequency as needed
          priority: story.content.priority || 0.7, // Adjust priority for different pages (0.1 to 1.0)
        };
    });

    const xml = generateXml(urls);
    await writeToFile(xml, 'public/sitemap.xml');

    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

function generateXml(urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((url) => {
      return `
        <url>
          <loc>${url.loc}</loc>
          <lastmod>${url.lastmod}</lastmod>
          <changefreq>${url.changefreq}</changefreq>
          <priority>${url.priority}</priority>
        </url>
      `;
    }).join('')}
  </urlset>`;
  return xml;
}

function writeToFile(content, filePath) {
  const fs = require('fs/promises');
  return fs.writeFile(filePath, content);
}

generateSitemap().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
