import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import { axiosClient } from './http';

import type { App } from 'vue';
import router from '@/router';

export function registerPlugins(app: App) {
  app.use(router);
  loadFonts();
  app.use(vuetify);
  app.use(axiosClient);
}