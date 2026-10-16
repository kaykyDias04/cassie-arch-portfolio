import { defineCliConfig } from 'sanity/cli';

// Usado apenas pela CLI (`npx sanity ...`), ex.: `npx sanity cors add` ou backups.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
});
