import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const schemas = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) =>
    JSON.parse(match[1]),
  );

test('SEO uses one canonical URL and matching social metadata per page', async () => {
  for (const [file, url] of [
    ['index.html', 'https://kurosushifusion.com/'],
    ['menu.html', 'https://kurosushifusion.com/menu.html'],
  ]) {
    const html = await read(file);
    assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1);
    assert.ok(html.includes(`<link rel="canonical" href="${url}">`));
    assert.ok(html.includes(`<meta property="og:url" content="${url}">`));
    assert.equal([...html.matchAll(/name="description"/g)].length, 1);
    assert.ok(!html.includes('913 162 520'));
    for (const match of html.matchAll(
      /(?:property="og:image"|name="twitter:image") content="([^"]+)"/g,
    )) {
      await access(new URL(`../public${decodeURI(new URL(match[1]).pathname)}`, import.meta.url));
    }
  }
});

test('structured menu mirrors all current dishes without invented fixed starting prices', async () => {
  const dishes = JSON.parse(await read('src/data/dishes.json'));
  const menu = schemas(await read('menu.html')).find((schema) => schema['@type'] === 'Menu');
  const items = menu.hasMenuSection.flatMap((section) => section.hasMenuItem);
  assert.equal(items.length, dishes.length);
  for (const dish of dishes) {
    const item = items.find((entry) => entry.url.endsWith(`#${dish.id}`));
    assert.equal(item.name, dish.name);
    assert.equal(decodeURI(new URL(item.image).pathname), `/${dish.image.src}`);
    if (dish.price.startsWith('Desde')) assert.equal(item.offers, undefined);
    else {
      assert.equal(item.offers.price, dish.price.slice(2));
      assert.equal(item.offers.priceCurrency, 'PEN');
    }
  }
  const restaurant = schemas(await read('index.html')).find(
    (schema) => schema['@type'] === 'Restaurant',
  );
  assert.equal(restaurant.acceptsReservations, true);
  assert.equal(restaurant.hasMenu['@id'], menu['@id']);
});

test('sitemap lists canonical pages and existing images, and robots advertises it', async () => {
  const sitemap = await read('public/sitemap.xml');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(urls, ['https://kurosushifusion.com/', 'https://kurosushifusion.com/menu.html']);
  assert.ok(!sitemap.includes('<lastmod>'));
  for (const match of sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)) {
    await access(new URL(`../public${decodeURI(new URL(match[1]).pathname)}`, import.meta.url));
  }
  assert.ok(
    (await read('public/robots.txt')).includes('Sitemap: https://kurosushifusion.com/sitemap.xml'),
  );
});
