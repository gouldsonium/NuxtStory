const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const storyblokManageApi = axios.create({
  baseURL: "https://mapi.storyblok.com/v1",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.STORYBLOK_PERSONAL_TOKEN
  },
});

const generateContent = async () => {
  try {
    // Create config
    await storyblokManageApi.post(`/spaces/${process.env.STORYBLOK_SPACE_ID}/stories`, {
      story: { name: "Config", slug: "config", content: { component: "config", copyright: "example"}}
    });

    console.log('Config story created')

    const pages = [
      {
        name: 'Home',
        slug: 'home',
        description: 'Page description needed here',
        priority: '1.0',
        sitemap_ignore: false,
        meta_description: "Page description needed here",
      },
      {
        name: "Privacy Policy",
        slug: "privacy-policy",
        description: "This is our privacy policy",
        priority: '0.1',
        sitemap_ignore: true,
        meta_description: "This is our privacy policy",
      },
      {
        name: "Success",
        slug: "success",
        description: "This is the success page",
        priority: '0.2',
        sitemap_ignore: true,
        meta_description: "This page is used for whenever a user submits a form on the site",
      },
      // Add more pages as needed
    ];

    // Create pages
    await Promise.all(pages.map(async (page) => {
      await storyblokManageApi.post(`/spaces/${process.env.STORYBLOK_SPACE_ID}/stories`, {
        story: {
          name: page.name,
          slug: page.slug,
          content: {
            component: "page",
            meta_title: process.env.WEBSITE_NAME + ' - ' + page.name,
            meta_description: page.meta_description,
            priority: page.priority,
            sitemap_ignore: page.sitemap_ignore,
            body: [
              {
                component: "hero",
                title: page.name,
              }
            ]
          }
        }
      });
      console.log(`${page.name} page created`);
    }));

    const folderResponse = await storyblokManageApi.post(`/spaces/${process.env.STORYBLOK_SPACE_ID}/stories`, {
      story: {
        name: "Blog",
        slug: 'blog',
        is_folder: true,
        default_root: "article"
      }
    });

    console.log('Blog Folder Created');
    const blogFolderID = folderResponse.data.story.id;

    // Create Blog page
    await storyblokManageApi.post(`/spaces/${process.env.STORYBLOK_SPACE_ID}/stories`, {
      story: {
        name: "Blog",
        // slug: "blog",
        parent_id: blogFolderID,
        is_startpage: true,
        content: {
          component: "page",
          meta_title: process.env.WEBSITE_NAME + ' - Blog',
          meta_description: 'Welcome to our blog',
          body: [
            {
              component: "hero",
              title: 'Our Blog',
            }
          ]
        }
      }
    });

    console.log('Blog page created')
  } catch (err){
    console.error('Error creating initial content: ', err);
  }
};

generateContent();