async function updateEntry({ model, entry }) {
  try {
    const createdEntry = await strapi.entityService.update(
      `api::${model}.${model}`,
      entry.id,
      {
        data: entry,
      }
    );
    return createdEntry;
  } catch (e) {
    console.log("model", entry, e);
  }
}

module.exports = updateEntry;
