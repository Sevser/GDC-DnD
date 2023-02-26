module.exports = {
  routes: [
    {
      method: "GET",
      path: "/equipments/armor",
      handler: "equipment.findArmor",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/equipments/weapons",
      handler: "equipment.findWeapon",
      config: {
        auth: false,
      },
    },
  ],
};
