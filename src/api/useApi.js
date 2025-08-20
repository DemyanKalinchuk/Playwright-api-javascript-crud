import { httpCall, httpCallRaw } from '../utils/httpRequest.js';

export class UseApi {
  constructor(request, testInfo, baseURL, logger) {
    this.request = request;
    this.testInfo = testInfo;
    this.baseURL = baseURL;
    this.logger = logger;
  }

  // ---- helpers
  #abs(path) { return this.baseURL + path; }

  // ---- generic HTTP (success-enforcing)
  async get(path) {
    this.logger.request('GET', path);
    const { response, text, json } = await httpCall({
      request: this.request, testInfo: this.testInfo,
      method: 'GET', url: this.#abs(path)
    });
    this.logger.response(response.status(), json ?? text);
    return { response, text, json };
  }

  async post(path, body) {
    this.logger.request('POST', path, body);
    const { response, text, json } = await httpCall({
      request: this.request, testInfo: this.testInfo,
      method: 'POST', url: this.#abs(path), body
    });
    this.logger.response(response.status(), json ?? text);
    return { response, text, json };
  }

  async put(path, body) {
    this.logger.request('PUT', path, body);
    const { response, text, json } = await httpCall({
      request: this.request, testInfo: this.testInfo,
      method: 'PUT', url: this.#abs(path), body
    });
    this.logger.response(response.status(), json ?? text);
    return { response, text, json };
  }

  async patch(path, body) {
    this.logger.request('PATCH', path, body);
    const { response, text, json } = await httpCall({
      request: this.request, testInfo: this.testInfo,
      method: 'PATCH', url: this.#abs(path), body
    });
    this.logger.response(response.status(), json ?? text);
    return { response, text, json };
  }

  // ---- raw variants (no success check; for negative tests)
  async getRaw(path) {
    this.logger.request('GET (raw)', path);
    const { response, text, json } = await httpCallRaw({
      request: this.request, testInfo: this.testInfo,
      method: 'GET', url: this.#abs(path)
    });
    this.logger.response(response.status(), json ?? text);
    return { response, text, json };
  }

  async postRaw(path, body) {
    this.logger.request('POST (raw)', path, body);
    const { response, text, json } = await httpCallRaw({
      request: this.request, testInfo: this.testInfo,
      method: 'POST', url: this.#abs(path), body
    });
    this.logger.response(response.status(), json ?? text);
    return { response, text, json };
  }

  async deleteRaw(path) {
    this.logger.request('DELETE (raw)', path);
    const { response, text, json } = await httpCallRaw({
      request: this.request, testInfo: this.testInfo,
      method: 'DELETE', url: this.#abs(path)
    });
    this.logger.response(response.status(), json ?? text);
    return { response, text, json };
  }

  withQuery(path, params = {}) {
    const qs = new URLSearchParams(params).toString();
    return qs ? `${path}?${qs}` : path;
  }
}