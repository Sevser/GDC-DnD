class HttpClient {
  _client = null;
  resolver = null;
  rejector = null;
  promise = null;
  constructor() {
    this._client = null;
    this.promise = new Promise((resolve, reject) => {
      this.resolver = resolve;
      this.rejector = reject;
    });
  }
  get client() {
    if (!this._client) {
      return this.promise;
    }
    return this._client;
  }

  injectHttpClient(client) {
    this.resolver(client);
    this._client = client;
  }
}

const httpClient = new HttpClient();
export default httpClient;
