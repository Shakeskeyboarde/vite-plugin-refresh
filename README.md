# vite-plugin-refresh

Enhances the Vite dev server by adding production dependencies to the watcher, and optionally doing full page reloads on changes.

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
- `reload?: boolean`: Reload the page on changes (disables HMR). Defaults to `false`.
- `delay?: number`: Delay page reloads by a number of milliseconds. Defaults to `1000`.
- `log?: boolean`: Log changed files and page reloads to the console. Defaults to `false`.

Example:

```ts
refresh({
  include: ['package-a'],
  exclude: ['package-b'],
  reload: true,
  delay: 3000,
  log: true,
});
```
