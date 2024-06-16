# Nuxt 3 + Storyblok Starter Template

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more about Nuxt.js
Look at the [Storyblok documentation](https://www.storyblok.com/tc/nuxtjs) to learn more about Nuxt with Storyblok

## Note

This template is a prototype for an upcoming project called NuxtStory. This will allow users to quickly create a highly customisable website that can be improved upon by the developer if they so wish.

## Setup

### Prerequisites

- A Storyblok Account
- An empty space with no content or bloks. Page blok needs to be renamed to old_page
- An active storyblok user access token
- A Storyblok access token

NOTE: To fully utilise this site on a live environment, you will need to connect storyblok to a webhook which will deploy your site everytime you publish something. I would recommend Netlify.

Make sure to install the dependencies:

```bash
# yarn
yarn install
```


## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

To preview in storyblok, you must be running on https. Run the following command in a seperate terminal after running dev to run a server at `https://localhost:3010`:

```bash
# yarn
yarn proxy
```

## Production

### Preview Environment

Build the application for production that changes whenever content is saved and allow you to use the Storyblok visual editor

- Set STORYBLOK_VERSION = 'draft'
- Use a STORYBLOK_ACCESS_TOKEN with 'preview' access level 

```bash
yarn build
```

### Live Environment

Build the application for production that is only shows published content and is static for better performance and SEO

- Set STORYBLOK_VERSION = 'published'
- Use a STORYBLOK_ACCESS_TOKEN with 'public' access level 

```bash
# generate also creates a sitemap.xml
yarn generate
```
