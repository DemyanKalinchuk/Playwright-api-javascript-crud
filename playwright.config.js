// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['list'], ['allure-playwright']],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://reqres.in',
    extraHTTPHeaders: (() => {
      const headers = { 'Accept-Language': process.env.ACCEPT_LANGUAGE ?? 'en-US' };
      const token = "reqres-free-v1";
      if (token) headers.Authorization = `Bearer ${token}`;
      return headers;
    })(),
  },
  expect: { timeout: 5000 }
});
