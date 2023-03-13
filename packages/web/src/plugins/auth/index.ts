import { App, reactive } from 'vue';

export interface StrapiUser {
  id: number;
  username: string;
  email: string;
}

export interface AuthManager {
  token: string;
  refreshToken: string;
  user: StrapiUser;
  authState: {
    isAuth: boolean;
  };
  logoff: () => void;
}

const LOCAL_STORAGE_AUTH_KEY = 'auth';

class AuthManagerStrapi implements AuthManager {
  private _user?: StrapiUser;
  private _jwt?: string;
  private _refreshToken?: string;
  authState = reactive({ isAuth: false });
  constructor() {
    const savedUser = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY) || '';
    if (this.checkLocalStorageUser(savedUser) && savedUser.length) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.jwt && parsedUser.jwt.length && parsedUser.user && parsedUser.user.id && parsedUser.user.username && parsedUser.user.email) {
        this._jwt = parsedUser.jwt;
        this._user = parsedUser.user;
        this._refreshToken = parsedUser.refreshToken;
        this.authState.isAuth = true;
      } else {
        this._jwt = undefined;
        this._user = undefined;
        this._refreshToken = undefined;
      }
    } else {
      this._jwt = undefined;
      this._user = undefined;
      this._refreshToken = undefined;
    }
    window.addEventListener('beforeunload', () => {
      window.localStorage.setItem(
        LOCAL_STORAGE_AUTH_KEY,
        JSON.stringify({
          jwt: this._jwt,
          user: this._user,
          refreshToken: this._refreshToken,
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

  get refreshToken() {
    if (!this._refreshToken) {
      throw 'Refresh token not specified';
    }
    return this._refreshToken;
  }

  set refreshToken(refreshToken: string) {
    this._refreshToken = refreshToken;
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
    if (this._jwt && this._user && this._refreshToken) {
      window.localStorage.setItem(
        LOCAL_STORAGE_AUTH_KEY,
        JSON.stringify({
          jwt: this._jwt,
          user: this._user,
          refreshToken: this._refreshToken,
        })
      );
      this.authState.isAuth = true;
    }
  }

  logoff() {
    this._jwt = undefined;
    this._user = undefined;
    this.authState.isAuth = false;
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
