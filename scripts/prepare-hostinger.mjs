import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

// Hostinger's Git integration checks out main without running Node.
// Track only the compiled pages/bundles; images already live in public/Assets.
const project = new URL('../', import.meta.url);
const output = new URL('hosting/', project);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'menu.html', 'bundles']) {
  await cp(new URL(`dist/${name}`, project), new URL(name, output), { recursive: true });
}

const protection = await readFile(new URL('public/.htaccess', project), 'utf8');
const routes = `
  # Serve the checked-in production build after a direct Git deployment.
  # END avoids applying source-file protection again to these internal paths.
  RewriteRule ^$ hosting/index.html [END]
  RewriteRule ^(index|menu)\\.html$ hosting/$1.html [END]
  RewriteRule ^bundles/(.+)$ hosting/bundles/$1 [END]
  RewriteRule ^Assets/(.+)$ public/Assets/$1 [END]
  RewriteRule ^(robots\\.txt|sitemap\\.xml|google[a-z0-9]+\\.html)$ public/$1 [END]

`;
await writeFile(
  new URL('.htaccess', project),
  protection.replace('  # Source files left', `${routes}  # Source files left`),
);
console.log('Hostinger: compiled pages, bundles and root routing prepared.');
