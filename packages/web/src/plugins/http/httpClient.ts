import axios from 'axios';
import { cmsClient } from '.';
import auth, { authManager } from '../auth';

// Todo: client with auth with strapi.
const httpClient = axios.create();

httpClient.interceptors.request.use(async function (config) {
  try {
    if (authManager.authState.isAuth) {
      const token = authManager.token;
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.log(e);
  }
  return config;
});

httpClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    if (error.response.code === 401) {
      console.log(401);
      const data = await cmsClient.refreshToken({
        refreshToken: authManager.token,
      });
      console.log(data);
    }
    return Promise.reject(error);
  }
);

export default httpClient;
