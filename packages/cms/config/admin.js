module.exports = ({ env }) => ({
  url: env("PUBLIC_ADMIN_URL", undefined),
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
});
