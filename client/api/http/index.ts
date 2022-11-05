import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// This Http class wraps a provider (in this case an axios instance)
// which should be used to make network requests in the app
export class Http {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  private headers(contentType: string) {
    let headers: Record<string, string> = {
      "Content-Type": contentType,
      "Custom-User-Agent": `orimboard/v0.1.0`,
    };

    return headers;
  }

  private config(
    params = {},
    contentType = "application/json",
    // eslint-disable-next-line
    onUploadProgress: (progressEvent: any) => void = () => {
      // noop
    }
  ): AxiosRequestConfig {
    return {
      params,
      onUploadProgress,
      headers: this.headers(contentType),
    };
  }

  get<T>(url = "", params = {}): Promise<AxiosResponse<T>> {
    const request = this.http.get<T>(url, this.config(params));
    return request;
  }

  upload<T>(
    url = "",
    data = {},
    onUploadProgress?: (progressEvent: any) => void // eslint-disable-line
  ): Promise<AxiosResponse<T>> {
    const request = this.http.post<T>(
      url,
      data,
      this.config({}, "multipart/form-data", onUploadProgress)
    );
    return request;
  }

  post<T>(url = "", data = {}): Promise<AxiosResponse<T>> {
    const request = this.http.post<T>(url, data, this.config({}));
    return request;
  }

  put<T>(url = "", data = {}): Promise<AxiosResponse<T>> {
    const request = this.http.put<T>(url, data, this.config({}));
    return request;
  }

  patch<T>(url = "", data = {}): Promise<AxiosResponse<T>> {
    const request = this.http.patch<T>(url, data, this.config({}));
    return request;
  }

  delete<T>(url = ""): Promise<AxiosResponse<T>> {
    const request = this.http.patch<T>(url, this.config({}));
    return request;
  }
}
