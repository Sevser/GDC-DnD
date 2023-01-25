const spells = require("./spells");
const fs = require("fs");

fs.writeFileSync("./data.json", JSON.stringify(spells));
