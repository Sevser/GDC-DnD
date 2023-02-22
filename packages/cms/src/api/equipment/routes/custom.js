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
  ],
};
