import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import { axiosClient } from './http';
import FloatingVue from 'floating-vue';

import 'floating-vue/dist/style.css';

import type { App } from 'vue';
import router from '@/router';
import auth from './auth';

export function registerPlugins(app: App) {
  app.use(router);
  loadFonts();
  app.use(vuetify);
  app.use(axiosClient);
  app.use(FloatingVue);
  app.use(auth);
}
