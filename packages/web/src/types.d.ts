import baseClient from './plugins/http/baseClient';
import * as cmsClient from './plugins/http/cmsClient';
import 'vite/client';
import { Store } from 'vuex';
import { State } from './store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $cmsClient: typeof cmsClient;
    $client: typeof baseClient;
    $store: Store<State>;
  }
}

export { }; // Important! See note.
