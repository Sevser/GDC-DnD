const createEntry = require("../../common/createEntry");
const features = require("5e-database/src/5e-SRD-Features.json");
const updateEntry = require("../../common/updateEntry");

const transformItem = (item, props) => {
  return {
    index: item.index,
    name: item.name,
    level: item.level,
    desc: item.desc.join(","),
    class: item.class
      ? props.classes.find((c) => c.index === item.class.index)
      : null,
    subclass: item.subclass
      ? props.subclasses.find((c) => c.index === item.class.index)
      : null,
  };
};

async function createFeatures(props) {
  const createdFeatures = await Promise.all(
    features.map((feat) => {
      return createEntry({
        model: "feature",
        entry: transformItem(feat, props),
      });
    })
  );
  const featWithParents = features.filter((f) => f.parent && f.parent.index);
  await Promise.all(
    featWithParents.map((feat) => {
      const oldFeat = createdFeatures.find((f) => f.index === feat.index);
      oldFeat.parent = createdFeatures.find(
        (f) => f.index === feat.parent.index
      );
      updateEntry({
        model: "feature",
        entry: oldFeat,
      });
    })
  );
  return createdFeatures;
}

module.exports = createFeatures;
