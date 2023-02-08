const createEntry = require("../../common/createEntry");
const alignments = require("5e-database/src/5e-SRD-Alignments.json");

async function createAlignments() {
  return Promise.all(
    alignments.map((alignment) => {
      return createEntry({
        model: "alignment",
        entry: alignment,
      });
    })
  );
}

module.exports = createAlignments;
