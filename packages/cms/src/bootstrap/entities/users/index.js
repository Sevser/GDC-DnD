const users = [
  {
    username: "planetary04",
    email: "stanleyfarsight@gmail.com",
    password: "webmasterQ12",
    provider: "local",
    confirmed: true,
  },
  {
    username: "sevser",
    email: "sevser40@gmail.com",
    password: "webmasterQ12",
    provider: "local",
    confirmed: true,
  },
];

async function createUsers() {
  const authRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({
      where: {
        type: "authenticated",
      },
    });
  return Promise.all(
    users.map(async (user) => {
      const password = await strapi.admin.services.auth.hashPassword(
        user.password
      );
      const us = await strapi
        .plugin("users-permissions")
        .service("user")
        .add({
          ...user,
          role: authRole,
        });
      return us;
    })
  );
}

module.exports = createUsers;
