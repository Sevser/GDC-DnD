import httpClient from './plugins/http/httpClient';
import * as cmsClient from './plugins/http/cmsClient';
import 'vite/client';
import { Store } from 'vuex';
import { State } from './store';
import { AuthManager } from './plugins/auth';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $cmsClient: cmsClient.ICMSClient;
    $client: typeof httpClient;
    $store: Store<State>;
    $authManager: AuthManager;
  }
}

export { }; // Important! See note.
