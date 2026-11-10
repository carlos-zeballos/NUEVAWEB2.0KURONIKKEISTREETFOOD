import { readFile, writeFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

// Keep page content in the generated HTML for search engines and first paint.
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: 'custom',
});
try {
  for (const [file, module] of [
    ['index.html', '/src/pages/HomePage.jsx'],
    ['menu.html', '/src/pages/MenuApp.jsx'],
  ]) {
    const { default: Page } = await server.ssrLoadModule(module);
    const html = await readFile(new URL(`../dist/${file}`, import.meta.url), 'utf8');
    const markup = renderToString(createElement(Page));
    await writeFile(
      new URL(`../dist/${file}`, import.meta.url),
      html.replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`),
    );
  }
} finally {
  await server.close();
}
