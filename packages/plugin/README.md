# vite-plugin-refresh

Do full page reloads when the source code changes, including any non-dev dependencies.

Reloads are debounced so that changes to multiple watched files will cause fewer reloads.

## Usage

Example: `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import refresh from 'vite-plugin-refresh';

export default defineConfig({
  plugins: [refresh()],
});
```

## Options

- `include?: string[]`: Include (additional) dependencies in the watch list.
- `exclude?: string[]`: Exclude dependencies from the watch list.
- `delay?: number`: Delay page reloads by a number of milliseconds. Defaults to `1000`.
- `log?: boolean`: Log changed files and page reloads to the console. Defaults to `false`.

Example:

```ts
refresh({
  include: ['package-a'],
  exclude: ['package-b'],
  delay: 3000,
  log: true,
});
```

## Monorepos

When continuously building a monorepo, it is recommended that you NOT delete build output on each rebuild. For example, when using Vite in "Library Mode", set the `build.emptyOutDir` option to `false`. When using the Typescript compiler in watch mode, don't set the `--clean` flag.
