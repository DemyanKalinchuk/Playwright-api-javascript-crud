// Replaces @playwright/test with a version that provides { logger, api, steps }
import { test as base } from '@playwright/test';
import { UseApi } from '../api/useApi.js';
import { UseApiSteps } from '../steps/useApiSteps.js';
import { createLogger } from '../utils/logger.js';

export const test = base.extend({
  logger: async ({}, use, testInfo) => {
    const logger = createLogger(testInfo, { level: process.env.LOG_LEVEL || 'info' });
    try {
      await use(logger);
    } finally {
      // Always attach logs
      await logger.attach('Test log');
    }
  },

  api: async ({ request, logger }, use, testInfo) => {
    const api = new UseApi(request, testInfo, testInfo.project.use.baseURL, logger);
    await use(api);
  },

  steps: async ({ api, logger }, use) => {
    const steps = new UseApiSteps(api, logger);
    await use(steps);
  },
});

// re-export expect for convenience
export const expect = test.expect;