"use strict";

const importSeedData = require("./entities");
const isFirstRun = require("./common/isFirstRun");

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
