import App from '@/App.vue';
import { store, key } from './store';

import { createApp } from 'vue';

import { registerPlugins } from '@/plugins';

const app = createApp(App);

app.use(store, key);

registerPlugins(app);

app.mount('#app');
