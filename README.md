# NuxtStory
![Image](public/nuxtstory.png)

**NuxtStory** is a customizable website template built using Nuxt.js & StoryBlok CMS.

## Setup

You need the following:

### For a No-Code Approach
- A Storyblok Account
- A Netlify Account
- A fork of this git repository

### To Run Locally
- A Storyblok Account
- Node v20
- Yarn

## In Storyblok

Follow the steps below before setting up the template either locally or in Netlify for the no-code approach.

1. Create a new space (China region not supported yet).
2. Hide the *Get Started* section.
3. Delete everything in the *Content* section.
4. Delete everything in the *Block Library* section.
5. You will get the following error: “The following blocks could not be deleted.” Storyblok requires a default block which cannot be deleted. To fix this, rename the page component to `old_page`. Do this by clicking on the block, navigating to the *Config* tab, and changing the Technical name.
6. Navigate to *Settings* and change the Default content type to `Old Page` (make sure to click the save button in the top right).

Find and note the following information which will be used as `.env` variables:

- **Access Token**: Found in Settings -> Access Tokens. There will already be one generated with preview access level.
- **Space ID**: Found in Settings -> Space (make sure to delete the #).
- **Personal Access Token**: Click *My account* on the bottom left of the screen. Navigate to Account Settings -> Personal access token. Click *Generate new token*, give it a name and expiry date, and click *Generate & Copy token*.  
  **IMPORTANT**: You can only see this token once, if you lose it, generate a new one.
- **Region**: If your space is hosted in the EU, you can leave this blank. Else set to `[US => us, Canada => ca, Australia => ap]`.

## Env Variables

A `.env` file contains environment variables, which are key-value pairs that store configuration settings, some of which are sensitive information. These variables are loaded into an application's environment, allowing the app to access and use them securely without hardcoding sensitive data directly into the public source code.

If you have followed along, you already have the following variables:

- `STORYBLOK_ACCESS_TOKEN` – The Access Token you got in the previous section.
- `STORYBLOK_PERSONAL_TOKEN` – The Personal Access Token you generated in the previous section.
- `STORYBLOK_SPACE_ID` – Found in Settings -> Space (make sure to delete the #).
- `STORYBLOK_REGION` – If your space is hosted in the EU, you can leave this blank. Else set to `[US => us, Canada => ca, Australia => ap]`.

### The Other Variables

- `STORYBLOK_VERSION` - Set to equal either `published` or `draft`. If you set this to `draft` and your access token is a preview type, your site will fetch whatever content is saved. If set to `published` and your access token is public, it will only fetch content you publish in StoryBlok.
- `FONT_URL`, `HEADING_FONT_FAMILY`, `TEXT_FONT_FAMILY` – This template is built to work with [Google Fonts](https://fonts.google.com). The URL fetches the font which, as shown in the `.env.example` file, is getting the Poppins and Work Sans font. You can then set what font you want heading text to be and the rest of the site.
- `SECONDARY_COLOR` – Set a HEX color for your site's secondary color. This is used for features that cannot be customized in the template. (Should look like this `#fc0000`).
- `WEBSITE_NAME`, `WEBSITE_URL` – Used for configuration files.
- `GTAG_ID` – Used to connect the site to Google Analytics.

## Deploy No Code

This section explains how to deploy your website without needing to write a single line of code. As mentioned already, you will need a Netlify account as this template is built to work with Netlify forms. You will also need to have forked this repository.

1. In Netlify, click *Add new site* and choose *Import from existing project*.
2. Choose *GitHub*.
3. Make sure your Netlify account has access to the forked repository.
4. Select your forked repository.
5. Under build settings, change *Build command* to `yarn setup && yarn build`.  
   Using yarn build makes the site update instantly but has slower speed; the faster option will be explained later.
6. Add your environment variables. These are explained in [Env Variables](#env-variables). I would recommend setting the version to `draft` and using a `preview` access token to begin with.
7. Click *Deploy*. You will be taken to the site overview page. You can click on the production deploy to view the deployment progress.
8. Once deployed, you will have a website with a home page and a footer. Your space’s Block Library will have 19 blocks, each grouped in relevant folders. Your Content page will have several pages, including Home, Privacy Policy, Success, and Blog. The Config manages other things you would like to customize on your site (favicon, nav links, etc.).
9. In Netlify, go to *Site configuration* and then under Build & deploy, click *Continuous deployment*. On the Build settings card, click *Configure* and change the Build command to just `yarn build`. This is to prevent the `yarn setup` command from running again, as it is no longer needed.
10. In settings, change the default content type back to `Page` (click save on top right). Then go to Block Library and delete `Old Page`.
11. Then go to *Visual Editor* in settings and change the Location (default environment) to the website URL Netlify just generated. Make sure to include a `/` at the end of the URL and click save on the top right.
12. Build your site.

You can now add whatever you like through StoryBlok’s visual editor, giving you a live preview of your site. The site will update instantly every time you save a change (assuming you set the version to `draft` and your access token type is `preview`).

## Deploy Locally

For the devs reading, you might want to clone to your local machine and run it there before deploying.

1. `git clone` this repo.
2. `yarn install`.
3. Add your environment variables. These are explained in [Env Variables](#env-variables). I would recommend setting the version to `draft` and using a preview access token to begin with.
4. Run `yarn setup`. Once done, you will have a website with a home page and a footer. Your space’s Block Library will have 19 blocks, each grouped in relevant folders. Your Content page will have several pages, including Home, Privacy Policy, Success, and Blog. The Config manages other things you would like to customize on your site (favicon, nav links, etc.).
5. Run `yarn dev` to start a development server on `http://localhost:300`.
6. Now to actually see your site in the visual editor, you want to go to *Visual Editor* in settings and change the Location (default environment) to localhost. However, the editor only allows https, not http. Fortunately, with this template, you can run `yarn proxy` and you can use `https://localhost:3010/`. (Make sure you include the `/` at the end and click save in the top right).
7. Build your site.

If you want to deploy this to Netlify, copy the steps from the [Deploy No Code](#deploy-no-code) section but replace the `yarn setup && yarn build` commands with just `yarn build` as you have already set up your StoryBlok account.

## Known Bug
The `section` and `grid item` bloks don't allow you to add to their *content* straight away. To fix this:

1. Go to *Block Library*
2. Click on the `Section` block
3. Under fields, click on *content*
4. Scroll down and select the Folder(s) option. This should like **Components (/Components)**
5. Click save & back to fields
6. Click on `grid-item`
7. Repeat steps 3-5

This appears to be a bug with the Storyblok API, I will raise it with them or update this to fix

## Preview vs Live Site

If you have deployed to Netlify, you will have a live site that is fetching content from your StoryBlok space every time you save. This is great as a preview site where you can see the changes and save them as they happen. However, because the site fetches everything at once, it is a bit slow. Additionally, you might have a page or blog post that is a work in progress, and you do not want it on the site.

To fix this, do the following:

**Note**: You can either change your current site or deploy a new one connected to your space with the following changes:

- Change the `yarn build` to `yarn generate`.
- Change the Access Token to be type `Public`.
- Change the `STORYBLOK_VERSION` .env variable to `published`.

With these changes, the site will fetch only content that has been published each time you deploy. This content is saved to the site, making it faster and means you can make changes in StoryBlok without affecting the site.

You can further optimize your workflow by connecting a webhook to your Netlify site, which will trigger every time you publish/unpublish something.

## Thanks

- To YOU for reading this
- The team at [Nuxt.js](https://github.com/orgs/nuxt/people) for developing Nuxt.js
- [StoryBlok](https://www.storyblok.com) for their platform and documentation
- [Netlify](https://www.netlify.com) for their hosting services

I’ve made this project open source for everyone to use for free, but if you can support me as I maintain NuxtStory and work on more open source projects, consider helping through my [Patreon](https://patreon.com/Gouldsonium)

