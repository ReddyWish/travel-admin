import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: 'app/**/*.graphql',
  ignoreNoDocuments: true,
  generates: {
    './app/__generated__/types.ts': {
      plugins: ['typescript'],
      config: {
        scalars: {
          Date: 'string',
        },
      },
    },
    './app/': {
      preset: 'near-operation-file',
      presetConfig: {
        folder: '__generated__',
        extension: '.tsx',
        baseTypesPath: '__generated__/types.ts',
      },
      plugins: [
        {
          add: {
            content: [
              '// 🛑 NOTICE: Generated file - do not edit manually',
              '// 🛑 Add __generated__ folders to .gitignore',
            ],
          },
        },
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        useTypeImports: true,
        withHooks: true,
        withRefetchFn: true,
        reactApolloVersion: 3,
      },
    },
  },

  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
