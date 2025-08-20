import { test, expect } from '../../src/fixtures/steps.fixtures.js';

test('users: list page 1', async ({ steps, logger }) => {
  const { json } = await steps.listUsers(1);
  logger.debug('Users list page=1', json);
  expect(json.page).toBe(1);
  expect(json.data.length).toBeGreaterThan(0);
});

test('users: get existing', async ({ steps, logger }) => {
  const { json } = await steps.getUser('2');
  logger.debug('Single user id=2', json);
  expect(json.data.id).toBe(2);
  expect(json.data.email).toContain('@');
});

test('users: not found id 23', async ({ steps, logger }) => {
  const { response, text } = await steps.getUserRaw('23');
  logger.debug('User not found id=23', { status: response.status(), body: text });
  expect(response.status()).toBe(404);
  expect(text === '' || text === '{}' || text === 'null').toBeTruthy();
});

test('users: create + put + patch + delete', async ({ steps, logger }) => {
  const created = await steps.createUser('morpheus', 'leader');
  logger.info('Created user', created.json);
  expect(created.json.id).toBeTruthy();

  const put = await steps.updateUserPut('2', 'neo', 'the one');
  logger.info('Updated user (PUT)', put.json);
  expect(put.json.updatedAt).toBeTruthy();

  const patch = await steps.updateUserPatch('2', 'trinity', 'operator');
  logger.info('Updated user (PATCH)', patch.json);
  expect(patch.json.updatedAt).toBeTruthy();

  const del = await steps.deleteUserRaw('2');
  logger.warn('Deleted user id=2', { status: del.response.status() });
  expect(del.response.status()).toBe(204);
});

test('users: list with delay=3', async ({ steps, logger }) => {
  const { response, json } = await steps.listUsersWithDelay(3);
  logger.debug('Users with delay=3', { status: response.status(), count: json?.data?.length });
  expect(response.status()).toBe(200);
  expect(Array.isArray(json?.data)).toBeTruthy();
});