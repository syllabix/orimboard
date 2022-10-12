import { Http } from "api/http";
import { provider } from "api/http/provider";
import axios from "axios";
import getConfig from "next/config";

class APIClient {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  get = async <T>(url = "", params = {}) => {
    try {
      return await this.http.get<T>(url, params);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw err;
      }
    }
  };
}

const { publicRuntimeConfig } = getConfig();

const Client = new APIClient(new Http(provider(publicRuntimeConfig.API_SERVER_PATH)));

export default Client;
