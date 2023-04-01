import axios from 'axios';
import { cmsClient } from '.';
import { authManager } from '../auth';

const cmsUrl = import.meta.env.VITE_APP_CMS_HOST;
const isRefresh = (config: any) => `${cmsUrl}/api/token/refresh` === config.url;

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
    if (error.response.status === 401 && !isRefresh(error.config)) {
      console.log(401, error);
      const data = await cmsClient.refreshToken({
        refreshToken: authManager.refreshToken,
      });
      console.log(data);
    } else if (error.response.status === 401 && isRefresh(error.config)) {
      authManager.logoff();
    }
    return Promise.reject(error);
  }
);

export default httpClient;
