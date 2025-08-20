import { test, expect } from '../../src/fixtures/steps.fixtures.js';

test('register: success returns id and token', async ({ steps }) => {
  const { json } = await steps.register('eve.holt@reqres.in', 'pistol');
  expect(json.id).toBeTruthy();
  expect(json.token).toBeTruthy();
});

test('register: missing password -> 400 with error', async ({ steps }) => {
  const { response, json } = await steps.registerRaw('sydney@fife', null);
  expect(response.status()).toBe(400);
  expect((json?.error ?? '').toLowerCase()).toContain('missing');
});