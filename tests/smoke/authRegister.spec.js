import { test, expect } from '@playwright/test';
import { UseApiSteps } from '../../src/steps/useApiSteps.js';

test('register: success returns id and token', async ({ request }, testInfo) => {
  const steps = new UseApiSteps(request, testInfo, testInfo.project.use.baseURL);
  const { json } = await steps.register('eve.holt@reqres.in', 'pistol');
  expect(json.id).toBeTruthy();
  expect(json.token).toBeTruthy();
});

test('register: missing password -> 400 with error', async ({ request }, testInfo) => {
  const steps = new UseApiSteps(request, testInfo, testInfo.project.use.baseURL);
  const { response, json } = await steps.registerRaw('sydney@fife', null);
  expect(response.status()).toBe(400);
  expect((json?.error ?? '').toLowerCase()).toContain('missing');
});
