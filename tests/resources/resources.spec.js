import { test, expect } from '../../src/fixtures/steps.fixtures.js';

test('resources: list', async ({ steps, logger }) => {
  const { json } = await steps.listResourcesRaw();
  logger.debug('Resources list', json);
  expect(Array.isArray(json?.data)).toBeTruthy();
  expect(json.data.length).toBeGreaterThan(0);
});

test('resources: single (id=2)', async ({ steps, logger }) => {
  const { json } = await steps.getResourceRaw('2');
  logger.debug('Resource id=2', json);
  expect(json.data.id).toBe(2);
  expect(json.data.name).toBeTruthy();
});