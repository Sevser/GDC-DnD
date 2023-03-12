import { App, reactive } from 'vue';

export interface StrapiUser {
  id: number;
  username: string;
  email: string;
}

export interface AuthManager {
  token: string;
  user: StrapiUser;
  authState: {
    isAuth: boolean;
  };
  logoff: () => undefined;
}

const LOCAL_STORAGE_AUTH_KEY = 'auth';

class AuthManagerStrapi implements AuthManager {
  private _user?: StrapiUser;
  private _jwt?: string;
  authState = reactive({ isAuth: false });
  constructor() {
    const savedUser = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY) || '';
    if (this.checkLocalStorageUser(savedUser)) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.jwt && parsedUser.jwt.length && parsedUser.user && parsedUser.user.id && parsedUser.user.username && parsedUser.user.email) {
        this._jwt = parsedUser.jwt;
        this._user = parsedUser.user;
        this.authState.isAuth = true;
      } else {
        this._jwt = undefined;
        this._user = undefined;
      }
    } else {
      this._jwt = undefined;
      this._user = undefined;
    }
    window.addEventListener('beforeunload', () => {
      window.localStorage.setItem(
        LOCAL_STORAGE_AUTH_KEY,
        JSON.stringify({
          jwt: this._jwt,
          user: this._user,
        })
      );
    });
  }

  checkLocalStorageUser(localStorageUser: string): boolean {
    return /^[\],:{}\s]*$/.test(
      localStorageUser // eslint-disable-next-line
        .replace(/\\["\\\/bfnrtu]/g, '@') // eslint-disable-next-line
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
        .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
    );
  }

  get user() {
    if (!this._user) {
      throw 'User not specified';
    }
    return this._user;
  }

  set user(user: StrapiUser) {
    this._user = user;
    this.checkForUser();
  }

  get token() {
    if (!this._jwt) {
      throw 'Token not specified';
    }
    return this._jwt;
  }

  set token(token: string) {
    this._jwt = token;
    this.checkForUser();
  }

  get isAuth() {
    return !!this._user;
  }

  private checkForUser() {
    if (this._jwt && this._user) {
      window.localStorage.setItem(
        LOCAL_STORAGE_AUTH_KEY,
        JSON.stringify({
          jwt: this._jwt,
          user: this._user,
        })
      );
      this.authState.isAuth = true;
    }
  }

  logoff() {
    this._jwt = undefined;
    this._user = undefined;
    window.localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  }
}

const authManager = new AuthManagerStrapi();

export { authManager };

export default {
  install: (app: App<any>) => {
    app.config.globalProperties.$authManager = authManager;
  },
};
