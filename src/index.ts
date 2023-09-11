import { readFile } from 'node:fs/promises';

import { type Plugin } from 'vite';

export interface RefreshPluginOptions {
  /**
   * Additional packages (node_modules) to watch for changes.
   *
   * All non-dev dependencies are included by default. Packages included
   * here will be appended to the default list. Use the `exclude` option
   * to remove packages from the default list.
   */
  include?: string[];
  /**
   * Packages (node_modules) to be excluded from change detection.
   */
  exclude?: string[];
  /**
   * Delay in milliseconds before reloading the page. Defaults to `1000`.
   */
  delay?: number;
  /**
   * Write log messages to the console. Defaults to `false`.
   */
  log?: boolean;
}

export default ({ include = [], exclude = [], delay = 1000, log = false }: RefreshPluginOptions = {}): Plugin => ({
  name: 'vite-plugin-refresh',
  apply: 'serve',
  config: async () => {
    const packageJson = await readFile('package.json', 'utf-8').then((json) => JSON.parse(json));
    const deps = new Set(
      Object.keys({
        ...packageJson.dependencies,
        ...packageJson.peerDependencies,
        ...packageJson.optionalDependencies,
        // Dev dependencies are intentionally excluded from the default.
      }),
    );

    include.forEach((dep) => deps.add(dep));
    exclude.forEach((dep) => deps.delete(dep));

    return {
      server: {
        hmr: true,
        watch: {
          ignored: [...deps].map((dep) => `!**/node_modules/${dep}/**`),
        },
      },
    };
  },
  configureServer: ({ watcher, ws, config: { logger } }) => {
    // A timeout is used to debounce reloads.
    let timeout: NodeJS.Timeout | undefined;

    const onChange = (path: string): void => {
      if (log) logger.info(`file changed: ${path}`);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (log) logger.info('page reloading...');
        ws.send({ type: 'full-reload', path: '*' });
      }, delay);
    };

    watcher.on('add', onChange);
    watcher.on('change', onChange);
  },
});
