import { WorkPath } from '../paths/workPath.js';
import { httpCall, httpCallRaw } from '../utils/httpRequest.js';

// Builders (simple helpers to mirror your Java builders)
const authRequest = (email, password) => ({ email, password });
const userRequest = (name, job) => ({ name, job });

export class UseApiSteps {
  constructor(request, testInfo, baseURL) {
    this.request = request;
    this.testInfo = testInfo;
    this.baseURL = baseURL;
  }

  // ---------- Auth
  async register(email, password) {
    const { url } = WorkPath.REGISTER;
    const payload = authRequest(email, password);
    return httpCall({
      request: this.request, testInfo: this.testInfo,
      method: 'POST', url: this.baseURL + url, body: payload
    });
  }
  async registerRaw(email, password) {
    const { url } = WorkPath.REGISTER;
    const payload = authRequest(email, password);
    return httpCallRaw({
      request: this.request, testInfo: this.testInfo,
      method: 'POST', url: this.baseURL + url, body: payload
    });
  }
  async login(email, password) {
    const { url } = WorkPath.LOGIN;
    const payload = authRequest(email, password);
    return httpCall({
      request: this.request, testInfo: this.testInfo,
      method: 'POST', url: this.baseURL + url, body: payload
    });
  }
  async loginRaw(email, password) {
    const { url } = WorkPath.LOGIN;
    const payload = authRequest(email, password);
    return httpCallRaw({
      request: this.request, testInfo: this.testInfo,
      method: 'POST', url: this.baseURL + url, body: payload
    });
  }

  // ---------- Users
  async listUsers(page = 1) {
    const { url } = WorkPath.USERS_ROOT;
    return httpCall({ request: this.request, testInfo: this.testInfo, method: 'GET', url: `${this.baseURL + url}?page=${page}` });
  }
  async getUser(id) {
    const { url } = WorkPath.USER_BY_ID(id);
    return httpCall({ request: this.request, testInfo: this.testInfo, method: 'GET', url: this.baseURL + url });
  }
  async getUserRaw(id) {
    const { url } = WorkPath.USER_BY_ID(id);
    return httpCallRaw({ request: this.request, testInfo: this.testInfo, method: 'GET', url: this.baseURL + url });
  }
  async createUser(name, job) {
    const { url } = WorkPath.USERS_ROOT;
    return httpCall({
      request: this.request, testInfo: this.testInfo,
      method: 'POST', url: this.baseURL + url, body: userRequest(name, job)
    });
  }
  async updateUserPut(id, name, job) {
    const { url } = WorkPath.USER_BY_ID(id);
    return httpCall({
      request: this.request, testInfo: this.testInfo,
      method: 'PUT', url: this.baseURL + url, body: userRequest(name, job)
    });
  }
  async updateUserPatch(id, name, job) {
    const { url } = WorkPath.USER_BY_ID(id);
    return httpCall({
      request: this.request, testInfo: this.testInfo,
      method: 'PATCH', url: this.baseURL + url, body: userRequest(name, job)
    });
  }
  async deleteUserRaw(id) {
    const { url } = WorkPath.USER_BY_ID(id);
    return httpCallRaw({ request: this.request, testInfo: this.testInfo, method: 'DELETE', url: this.baseURL + url });
  }
  async listUsersWithDelay(seconds = 3) {
    const { url } = WorkPath.USERS_DELAY(seconds);
    return httpCall({ request: this.request, testInfo: this.testInfo, method: 'GET', url: this.baseURL + url });
  }

  // ---------- Resources
  async listResourcesRaw() {
    const { url } = WorkPath.RESOURCES_ROOT;
    return httpCallRaw({ request: this.request, testInfo: this.testInfo, method: 'GET', url: this.baseURL + url });
  }
  async getResourceRaw(id) {
    const { url } = WorkPath.RESOURCE_BY_ID(id);
    return httpCallRaw({ request: this.request, testInfo: this.testInfo, method: 'GET', url: this.baseURL + url });
  }
}