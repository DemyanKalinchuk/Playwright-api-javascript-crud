import { test, expect } from '@playwright/test';
import { UseApiSteps } from '../../src/steps/useApiSteps.js';

test('login: success returns token', async ({ request }, testInfo) => {
  const steps = new UseApiSteps(request, testInfo, testInfo.project.use.baseURL, testInfo.project.use.token);
  const { json } = await steps.login('eve.holt@reqres.in', 'cityslicka');
  expect(json.token).toBeTruthy();
});

test('login: missing email -> 400 with error', async ({ request }, testInfo) => {
  const steps = new UseApiSteps(request, testInfo, testInfo.project.use.baseURL);
  const { response, json } = await steps.loginRaw(null, 'cityslicka');
  expect(response.status()).toBe(400);
  expect((json?.error ?? '').toLowerCase()).toContain('missing');
});
