const createEntry = require("../../common/createEntry");

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

module.exports = createDistances;
