// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://reqres.in',
    extraHTTPHeaders: (() => {
      const headers = { 'Accept-Language': process.env.ACCEPT_LANGUAGE ?? 'en-US' };
      const authToken = {'x-api-key': process.env.AUTH_TOKEN ?? 'reqres-free-v1'};

      if (process.env.AUTH_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.AUTH_TOKEN}`;
      }
      if (process.env.API_KEY) {
        headers['x-api-key'] = process.env.API_KEY;
      } else {
        headers['x-api-key'] = authToken['x-api-key'];
      }
      return headers;
    })(),
  },    
});