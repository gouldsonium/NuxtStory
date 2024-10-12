const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file
const fs = require('fs').promises;
const path = require('path');

const storyblokManageApi = axios.create({
  baseURL: !!process.env.STORYBLOK_REGION 
  ? `https://api-${process.env.STORYBLOK_REGION}.storyblok.com/v1` : "https://mapi.storyblok.com/v1",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.STORYBLOK_PERSONAL_TOKEN
  },
});

// Create blok folders
let folderNames = ["Items", "Components", "Modules", "Story"];
let folderIDs = {};

// Loop through and create folders and keep their uuid
async function createFolders() {
  try {
    for (const folderName of folderNames) {
      const res = await storyblokManageApi.post(`/spaces/${process.env.STORYBLOK_SPACE_ID}/component_groups`, {
        "component_group": {
          "name": folderName
        }
      });
      folderIDs[folderName.toLowerCase()] = res.data.component_group.uuid;
    }

    console.log('Folders created');
  } catch (err) {
    console.error('Error creating folders: ', err);
  }
}

async function createItems() {
  try {
    const itemsFolderPath = path.join(__dirname, '..', 'schemas', 'items'); // Adjusting the path to the root directory
    const files = await fs.readdir(itemsFolderPath);

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(itemsFolderPath, file);
        const content = await fs.readFile(filePath, 'utf8');
        let componentData = JSON.parse(content);

        // Add the component_group_uuid for items folder
        componentData.component_group_uuid = folderIDs.items;

        // Whitelist the folder components for grid item
        if(componentData.name == 'grid-item'){
          componentData.schema.content.component_group_whitelist = [folderIDs.components]
        }
        // Add items
        const res = await storyblokManageApi.post(`/spaces/${process.env.STORYBLOK_SPACE_ID}/components`, {
          component: componentData
        });

        console.log(`Item '${file}' created with ID: ${res.data.component.id}`);
      }
    }
  } catch (err) {
    console.error('Error creating items: ', err);
  }
}

async function createComponents() {
  try {
    const componentsFolderPath = path.join(__dirname, '..', 'schemas', 'components');
    const files = await fs.readdir(componentsFolderPath);

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(componentsFolderPath, file);
        const content = await fs.readFile(filePath, 'utf8');
        let componentData = JSON.parse(content);

        // Add the component_group_uuid for items folder
        componentData.component_group_uuid = folderIDs.components;

        // Add items
        const res = await storyblokManageApi.post(`/spaces/${process.env.STORYBLOK_SPACE_ID}/components`, {
          component: componentData
        });

        console.log(`Component '${file}' created with ID: ${res.data.component.id}`);
      }
    }
  } catch (err) {
    console.error('Error creating items: ', err);
  }
}

async function createModules() {
  try {
    const modulesFolderPath = path.join(__dirname, '..', 'schemas', 'modules');
    const files = await fs.readdir(modulesFolderPath);

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(modulesFolderPath, file);
        const content = await fs.readFile(filePath, 'utf8');
        let componentData = JSON.parse(content);

        // Add the component_group_uuid for items folder
        componentData.component_group_uuid = folderIDs.modules;

        // Whitelist the folder components for sections
        if(componentData.name == 'section'){
          componentData.schema.content.component_group_whitelist = [folderIDs.components]
        }

        // Add items
        const res = await storyblokManageApi.post(`/spaces/${process.env.STORYBLOK_SPACE_ID}/components`, {
          component: componentData
        });

        console.log(`Module '${file}' created with ID: ${res.data.component.id}`);
      }
    }
  } catch (err) {
    console.error('Error creating items: ', err);
  }
}

async function createStory() {
  try {
    const storyFolderPath = path.join(__dirname, '..', 'schemas', 'story');
    const files = await fs.readdir(storyFolderPath);

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(storyFolderPath, file);
        const content = await fs.readFile(filePath, 'utf8');
        let componentData = JSON.parse(content);

        // Add the component_group_uuid for items folder
        componentData.component_group_uuid = folderIDs.story;

        // Whitelist the folder components for sections
        if(componentData.name == 'page'){
          componentData.schema.body.component_group_whitelist = [folderIDs.modules]
        }

        // Add items
        const res = await storyblokManageApi.post(`/spaces/${process.env.STORYBLOK_SPACE_ID}/components`, {
          component: componentData
        });

        console.log(`Story '${file}' created with ID: ${res.data.component.id}`);
      }
    }
  } catch (err) {
    console.error('Error creating items: ', err);
  }
}

const generateBloks = async () => {
  await createFolders();
  // IMPORTANT there is a 'Rate limit of 6 request per second'
  setTimeout(() => {createItems()}, 1000)
  setTimeout(() => {createComponents()}, 2000)
  setTimeout(() => {createModules()}, 3000)
  setTimeout(() => {createStory()}, 4000)
}

generateBloks()
