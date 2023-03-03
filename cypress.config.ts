/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'cypress';

/* eslint-disable no-process-env */
const cypressProjectId = process.env.CYPRESS_PROJECT_ID;

export default defineConfig({
  ...(cypressProjectId ? { projectId: cypressProjectId } : {}),
  defaultCommandTimeout: 10000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: 3,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // eslint-disable-next-line global-require
      require('@cypress/code-coverage/task')(on, config);

      return config;
    }
  }
});
