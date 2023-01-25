let spells = require("./spells");
const fs = require("fs");
const translations = require("./data_1");

const map = new Map();
translations.forEach((tr) => {
  map.set(tr.engName.toLocaleLowerCase(), tr.rusName);
});

spells = spells.map((spell) => {
  return {
    ...spell,
    titleRus: map.has(spell.title.toLocaleLowerCase())
      ? map.get(spell.title.toLocaleLowerCase())
      : "",
    HighterLevelDescriptionRus: "",
    damage: "",
    damageRus: "",
    damageType: "",
  };
});

fs.writeFileSync("./data.json", JSON.stringify(spells));
