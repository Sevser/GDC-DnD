interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_CMS_HOST: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
