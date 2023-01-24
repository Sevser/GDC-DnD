import { App } from 'vue';
import baseClient from './baseClient';
import * as cmsClient from './cmsClient';

const axiosClient = {
  install: (app: App<any>) => {
    app.config.globalProperties.$client = baseClient;
    app.config.globalProperties.$cmsClient = cmsClient;
  },
};

export { baseClient as client, axiosClient, cmsClient };
