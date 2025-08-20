import { WorkPath } from '../paths/workPath.js';

// tiny builders
const authReq = (email, password) => ({ email, password });
const userReq = (name, job) => ({ name, job });

/** High-level steps that orchestrate domain flows using UseApi */
export class UseApiSteps {
  constructor(useApi, logger) {
    this.api = useApi;
    this.logger = logger;
  }

  // ---------- Auth
  async register(email, password) {
    const { url } = WorkPath.REGISTER;
    this.logger?.info('Register user', { email });
    return this.api.post(url, authReq(email, password));
  }

  async registerRaw(email, password) {
    const { url } = WorkPath.REGISTER;
    return this.api.postRaw(url, authReq(email, password));
  }

  async login(email, password) {
    const { url } = WorkPath.LOGIN;
    this.logger?.info('Login user', { email });
    return this.api.post(url, authReq(email, password));
  }

  async loginRaw(email, password) {
    const { url } = WorkPath.LOGIN;
    return this.api.postRaw(url, authReq(email, password));
  }

  // ---------- Users
  async listUsers(page = 1) {
    const { url } = WorkPath.USERS_ROOT;
    return this.api.get(this.api.withQuery(url, { page }));
  }

  async listUsersWithDelay(seconds = 3) {
    const { url } = WorkPath.USERS_DELAY(seconds);
    return this.api.get(url);
  }

  async getUser(id) {
    const { url } = WorkPath.USER_BY_ID(id);
    return this.api.get(url);
  }

  async getUserRaw(id) {
    const { url } = WorkPath.USER_BY_ID(id);
    return this.api.getRaw(url);
  }

  async createUser(name, job) {
    const { url } = WorkPath.USERS_ROOT;
    this.logger?.info('Create user', { name, job });
    return this.api.post(url, userReq(name, job));
  }

  async updateUserPut(id, name, job) {
    const { url } = WorkPath.USER_BY_ID(id);
    this.logger?.info('Update user (PUT)', { id, name, job });
    return this.api.put(url, userReq(name, job));
  }

  async updateUserPatch(id, name, job) {
    const { url } = WorkPath.USER_BY_ID(id);
    this.logger?.info('Update user (PATCH)', { id, name, job });
    return this.api.patch(url, userReq(name, job));
  }

  async deleteUserRaw(id) {
    const { url } = WorkPath.USER_BY_ID(id);
    this.logger?.warn('Delete user', { id });
    return this.api.deleteRaw(url);
  }

  // ---------- Resources
  async listResourcesRaw() {
    const { url } = WorkPath.RESOURCES_ROOT;
    return this.api.getRaw(url);
  }

  async getResourceRaw(id) {
    const { url } = WorkPath.RESOURCE_BY_ID(id);
    return this.api.getRaw(url);
  }
}