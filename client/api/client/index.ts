import { Http } from "api/http";
import { provider } from "api/http/provider";
import axios from "axios";
import getConfig from "next/config";

class APIError {
  message: string

  constructor(message: string) {
    this.message = message;
  }
}

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
        throw new APIError(err.message);
      }
      throw new APIError("unable to reach the internet")
    }
  };

  put = async <T>(url = "", data = {}) => {
    try {
      return await this.http.put<T>(url, data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new APIError(err.message);
      }
      throw new APIError("unable to reach the internet")
    }
  };
}

const { publicRuntimeConfig } = getConfig();
const Client = new APIClient(new Http(provider(publicRuntimeConfig.API_SERVER_PATH)));

export default Client;
