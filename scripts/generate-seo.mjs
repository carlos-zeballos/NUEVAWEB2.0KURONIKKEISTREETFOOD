import { readFile, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
export const origin = 'https://kurosushifusion.com';
const absolute = (path) => new URL(path, `${origin}/`).href;
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char],
  );
const text = (value) =>
  Array.isArray(value)
    ? value.map((part) => (typeof part === 'string' ? part : part.strong || '')).join('')
    : value;

export async function generateSeo() {
  const dishes = await read('src/data/dishes.json');
  const categories = await read('src/data/categories.json');
  const prices = dishes.map((dish) => Number(dish.price.match(/S\/(\d+(?:\.\d+)?)/)[1]));
  const home = await readFile(resolve(root, 'index.html'), 'utf8');
  const restaurant = JSON.parse(
    home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
  );
  // Preserve existing business details; do not infer ratings, coordinates or services.
  Object.assign(restaurant, {
    '@id': `${origin}/#restaurant`,
    url: `${origin}/`,
    image: absolute('Assets/local/LOCALKURO.png'),
    logo: absolute('Assets/nakama/logo.webp'),
    telephone: '+51949194985',
    acceptsReservations: true,
    priceRange: `S/${Math.min(...prices).toFixed(2)} - S/${Math.max(...prices).toFixed(2)}`,
    hasMenu: { '@id': `${origin}/menu.html#menu` },
  });
  const menu = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${origin}/menu.html#menu`,
    url: `${origin}/menu.html`,
    name: 'Menú Kuro Nikkei Street Food',
    inLanguage: 'es-PE',
    hasMenuSection: categories.map((category) => ({
      '@type': 'MenuSection',
      name: category.title,
      hasMenuItem: dishes
        .filter((dish) => dish.categoryId === category.id)
        .map((dish) => {
          const item = {
            '@type': 'MenuItem',
            '@id': `${origin}/menu.html#${dish.id}`,
            url: `${origin}/menu.html#${dish.id}`,
            name: dish.name,
            description: text(dish.description),
            image: absolute(dish.image.src),
          };
          // “Desde” is a starting price, not a fixed offer.
          const price = dish.price.match(/^S\/(\d+(?:\.\d{2})?)$/);
          if (price) item.offers = { '@type': 'Offer', price: price[1], priceCurrency: 'PEN' };
          return item;
        }),
    })),
  };
  const pages = [
    {
      file: 'index.html',
      url: `${origin}/`,
      title: 'KURO Nikkei Street Food | Sushi y makis en Yanahuara, Arequipa',
      description:
        'Sushi, makis, ramen y combos en KURO Nikkei Street Food. Visítanos en Calle Paz Soldán 202, Yanahuara, Arequipa. Consulta la carta y reserva por WhatsApp.',
      image: 'Assets/local/LOCALKURO.png',
      imageAlt: 'Local de KURO Nikkei Street Food en Yanahuara, Arequipa',
      schemas: [
        restaurant,
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${origin}/#website`,
          url: `${origin}/`,
          name: 'KURO Nikkei Street Food',
          inLanguage: 'es-PE',
          publisher: { '@id': restaurant['@id'] },
        },
      ],
      images: [
        'Assets/local/LOCALKURO.png',
        'Assets/promos/30-rolls-real.jpg',
        'Assets/nakama/rolls-photo.jpg',
        'Assets/nakama/feast-photo.jpg',
      ],
    },
    {
      file: 'menu.html',
      url: `${origin}/menu.html`,
      title: 'Carta de KURO Nikkei | Makis, ramen y combos en Arequipa',
      description:
        'Explora la carta de KURO: 66 opciones entre makis, entradas, ramen, combos, postres y bebidas. Consulta precios y pide por WhatsApp en Yanahuara, Arequipa.',
      image: 'Assets/promos/30-rolls-real.jpg',
      imageAlt: 'Promoción de 30 rolls de KURO Nikkei Street Food',
      schemas: [
        menu,
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${origin}/` },
            { '@type': 'ListItem', position: 2, name: 'Menú', item: `${origin}/menu.html` },
          ],
        },
      ],
      images: dishes.map((dish) => dish.image.src),
    },
  ];
  for (const page of pages) {
    for (const image of [page.image, ...page.images]) await access(resolve(root, 'public', image));
    let html = await readFile(resolve(root, page.file), 'utf8');
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`)
      .replace(
        /\s*<meta (?:name="(?:description|keywords|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g,
        '',
      )
      .replace(/\s*<link rel="canonical"[^>]*>/g, '')
      .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
    const metadata = [
      `<meta name="description" content="${escape(page.description)}">`,
      '<meta name="robots" content="index, follow, max-image-preview:large">',
      `<link rel="canonical" href="${page.url}">`,
      ...Object.entries({
        type: 'website',
        title: page.title,
        description: page.description,
        image: absolute(page.image),
        'image:alt': page.imageAlt,
        url: page.url,
        site_name: 'KURO Nikkei Street Food',
        locale: 'es_PE',
      }).map(([key, value]) => `<meta property="og:${key}" content="${escape(value)}">`),
      ...Object.entries({
        card: 'summary_large_image',
        title: page.title,
        description: page.description,
        image: absolute(page.image),
        'image:alt': page.imageAlt,
      }).map(([key, value]) => `<meta name="twitter:${key}" content="${escape(value)}">`),
      ...page.schemas.map(
        (schema) =>
          `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`,
      ),
    ].join('\n  ');
    html = html.replace('</head>', `  ${metadata}\n</head>`);
    await writeFile(resolve(root, page.file), html);
  }
  // Only canonical pages belong here; filters and dish fragments are not new pages.
  // Omit lastmod rather than publishing an invented build date.
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${pages.map((page) => `  <url>\n    <loc>${escape(page.url)}</loc>\n${[...new Set(page.images)].map((image) => `    <image:image><image:loc>${escape(absolute(image))}</image:loc></image:image>`).join('\n')}\n  </url>`).join('\n')}\n</urlset>\n`;
  await writeFile(resolve(root, 'public/sitemap.xml'), sitemap);
  await writeFile(
    resolve(root, 'public/robots.txt'),
    `User-agent: *\nAllow: /\nDisallow: /pag.web/\n\nSitemap: ${origin}/sitemap.xml\n`,
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generateSeo();
  console.log('SEO generado: 2 páginas canónicas, carta e imágenes del catálogo.');
}
