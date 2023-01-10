import baseClient from './plugins/http/baseClient';
import * as cmsClient from './plugins/http/cmsClient';
import 'vite/client';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $cmsClient: typeof cmsClient;
    $client: typeof baseClient;
  }
}

export { }; // Important! See note.
