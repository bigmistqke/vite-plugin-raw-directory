# @bigmistqke/vite-plugin-raw-directory

## Install

```bash
npm i @bigmistqke/vite-plugin-raw-directory
```

```bash
pnpm i @bigmistqke/vite-plugin-raw-directory
```

```bash
yarn add @bigmistqke/vite-plugin-raw-directory
```

## Usage

### Add plugin to `vite.config.ts`

```tsx
import rawDirectoryPlugin from '@bigmistqke/vite-plugin-raw-directory'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [rawDirectoryPlugin()],
})
```

### Extend types to support `?raw-directory` postfix

Add `@bigmistqke/vite-plugin-raw-directory/client` to tsconfig's `types`

```tsx
{
  "compilerOptions": {
    "types": [
      "vite/client",
      "@bigmistqke/vite-plugin-raw-directory/client"
    ],
  }
}
```

### Use `?raw-directory` postfix in code

to get flat representation of directory's sources.

The following files:

- `./directory/src/index.ts`: `console.log("hallo")`
- `./directory/index.html`: `<body>hallo</body>`

```tsx
import map from './directory?raw-directory'
// {
//   './src/index.ts': 'console.log("hallo")',
//   './index.html': '<body>hallo</body>'
// }
console.log(map)
```
