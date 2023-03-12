import { App } from 'vue';
import httpClient from './httpClient';
import * as cmsClient from './cmsClient';

const axiosClient = {
  install: (app: App<any>) => {
    app.config.globalProperties.$client = httpClient;
    app.config.globalProperties.$cmsClient = cmsClient;
  },
};

export { httpClient as client, axiosClient, cmsClient };
