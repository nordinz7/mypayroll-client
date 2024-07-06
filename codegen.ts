
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'http://0.0.0.0:8000/graphql': {
        headers: {
          authorization: 'jwt xxxx'
        }
      }
    }
  ],
  documents: "src/**/*.{ts,tsx}",
  generates: {
    "src/types/types.ts": {
      plugins: ['typescript', 'typescript-resolvers']
    },
  }
};

export default config;
