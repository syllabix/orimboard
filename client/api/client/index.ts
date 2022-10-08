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
const basePath = publicRuntimeConfig.API_URL || "http://localhost:8080";

const Client = new APIClient(new Http(provider(basePath)));

export default Client;
