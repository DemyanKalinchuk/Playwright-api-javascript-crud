import { test, expect } from '../../src/fixtures/steps.fixtures.js';

test('login: success returns token', async ({ steps, logger }) => {
  const { json } = await steps.login('eve.holt@reqres.in', 'cityslicka');
  logger.info('Login response', json);
  expect(json.token).toBeTruthy();
});

test('login: missing email -> 400 with error', async ({ steps, logger }) => {
  const { response, json } = await steps.loginRaw(null, 'cityslicka');
  logger.info('Login negative response', { status: response.status(), json });
  expect(response.status()).toBe(400);
  expect((json?.error ?? '').toLowerCase()).toContain('missing');
});