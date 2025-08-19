import { test, expect } from '@playwright/test';
import { UseApiSteps } from '../../src/steps/useApiSteps.js';

test('resources: list', async ({ request }, testInfo) => {
  const steps = new UseApiSteps(request, testInfo, testInfo.project.use.baseURL);
  const { json } = await steps.listResourcesRaw();
  expect(Array.isArray(json?.data)).toBeTruthy();
  expect(json.data.length).toBeGreaterThan(0);
});

test('resources: single (id=2)', async ({ request }, testInfo) => {
  const steps = new UseApiSteps(request, testInfo, testInfo.project.use.baseURL);
  const { json } = await steps.getResourceRaw('2');
  expect(json.data.id).toBe(2);
  expect(json.data.name).toBeTruthy();
});