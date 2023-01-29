"use strict";

const fs = require("fs");
const path = require("path");

const { experience, archetypes, spells } = require("./data/data");

const createEntry = require("./common/createEntry");

async function setPublicPermissions(newPermissions) {
  // Find the ID of the public role
  const publicRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({
      where: {
        type: "public",
      },
    });

  // Create the new permissions and link them to the public role
  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query("plugin::users-permissions.permission").create({
        data: {
          action: `api::${controller}.${controller}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });
  await Promise.all(allPermissionsToCreate);
}

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: "type",
    name: "setup",
  });
  const initHasRun = await pluginStore.get({ key: "initHasRun" });
  await pluginStore.set({ key: "initHasRun", value: true });
  return !initHasRun;
}

function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats["size"];
  return fileSizeInBytes;
}

function getFileData(fileName) {
  const filePath = `./data/uploads/${fileName}`;

  // Parse the file metadata
  const size = getFileSizeInBytes(filePath);
  const ext = fileName.split(".").pop();
  const mimeType = mime.lookup(ext);

  return {
    path: filePath,
    name: fileName,
    size,
    type: mimeType,
  };
}

async function createExperience(experience) {
  return Promise.all(
    experience.map((exp) => {
      return createEntry({
        model: "experience",
        entry: exp,
      });
    })
  );
}

async function createArchetypes(archetypes) {
  return Promise.all(
    archetypes.map((arc) => {
      return createEntry({
        model: "archetype",
        entry: arc,
      });
    })
  );
}

async function createSpells(spells) {
  return Promise.all(
    spells.map((spell) => {
      return createEntry({
        model: "spell",
        entry: spell,
      });
    })
  );
}

async function createDistances(distances) {
  return Promise.all(
    distances.map(async (distance) => {
      return createEntry({
        model: "distance",
        entry: distance,
      });
    })
  );
}

async function importSeedData() {
  // Allow read of application content types
  await setPublicPermissions({
    spell: ["find", "findOne"],
  });

  // Create all entries
  await createExperience(experience);
  await createArchetypes(archetypes);
  const createdSpells = await createSpells(spells);
  await createDistances(
    spells.map((spell, index) => ({
      ...spell.distance,
      spell: createdSpells[index],
    }))
  );
}

module.exports = async () => {
  const shouldImportSeedData = await isFirstRun();
  if (shouldImportSeedData) {
    try {
      await importSeedData();
    } catch (error) {
      console.log("Could not import seed data");
      console.error(error);
    }
  }
};
