const createEntry = require("../../common/createEntry");
const subclasses = require("5e-database/src/5e-SRD-Subclasses.json");

const tansformSubclass = (sc, props) => {
  return {
    index: sc.index,
    name: sc.name,
    subclassFlavor: sc.subclass_flavor,
    desc: sc.desc.join(", "),
    class: props.classes.find((c) => c.index === sc.class.index),
  };
};

async function createSubclass(props) {
  return Promise.all(
    subclasses.map((item) => {
      return createEntry({
        model: "subclass",
        entry: tansformSubclass(item, props),
      });
    })
  );
}

module.exports = createSubclass;
