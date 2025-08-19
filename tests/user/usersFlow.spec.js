import { test, expect } from '@playwright/test';
import { UseApiSteps } from '../../src/steps/useApiSteps.js';

test('users: list page 1', async ({ request }, testInfo) => {
  const steps = new UseApiSteps(request, testInfo, testInfo.project.use.baseURL);
  const { json } = await steps.listUsers(1);
  expect(json.page).toBe(1);
  expect(json.data.length).toBeGreaterThan(0);
});

test('users: get existing', async ({ request }, testInfo) => {
  const steps = new UseApiSteps(request, testInfo, testInfo.project.use.baseURL);
  const { json } = await steps.getUser('2');
  expect(json.data.id).toBe(2);
  expect(json.data.email).toContain('@');
});

test('users: not found id 23', async ({ request }, testInfo) => {
  const steps = new UseApiSteps(request, testInfo, testInfo.project.use.baseURL);
  const { response, text } = await steps.getUserRaw('23');
  expect(response.status()).toBe(404);
  expect(text === '' || text === '{}' || text === 'null').toBeTruthy();
});

test('users: create + update put + patch + delete', async ({ request }, testInfo) => {
  const steps = new UseApiSteps(request, testInfo, testInfo.project.use.baseURL);

  const created = await steps.createUser('morpheus', 'leader');
  expect(created.json.id).toBeTruthy();

  const put = await steps.updateUserPut('2', 'neo', 'the one');
  expect(put.json.updatedAt).toBeTruthy();

  const patch = await steps.updateUserPatch('2', 'trinity', 'operator');
  expect(patch.json.updatedAt).toBeTruthy();

  const del = await steps.deleteUserRaw('2');
  expect(del.response.status()).toBe(204);
});