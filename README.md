# Kuro Nikkei — React

Sitio React y Vite con una nueva identidad juvenil basada en KURO NAKAMA: crema, amarillo, naranja, titulares Outfit y texto DM Sans. Conserva las URLs `index.html` y `menu.html`, los 66 productos y los flujos de WhatsApp. La dirección visual está documentada en [DESIGN.md](DESIGN.md).

## Desarrollo

Requiere Node.js 20.19+ o 22.12+.

```sh
npm ci
npm run dev
```

## Producción

```sh
npm run build
npm run preview
```

El build genera `dist/` con las dos páginas prerenderizadas e hidratadas con React. Para actualizar el hosting existente, subir **el contenido de `dist/`**, incluyendo `Assets/`, `bundles/` y `.htaccess`. No hace falta un servidor Node en producción.

## Organización

- `src/pages/`: composición de las páginas.
- `src/components/`: cabecera, pie, ilustraciones, WhatsApp y secciones reutilizables.
- `src/components/menu/`: categorías y tarjetas de productos.
- `src/data/dishes.json`: los 66 productos con sus precios, imágenes y sabores.
- `src/data/categories.json`: categorías y grupos de bebidas.
- `src/hooks/`: integración de las animaciones de entrada.
- `src/utils/`: filtros, navegación, validación de reservas y mensajes de WhatsApp.
- `src/styles/`: tokens y estilos de la identidad en `brand.css`; ambas páginas comparten el mismo sistema visual.
- `public/`: recursos originales y archivos de hosting y SEO.
- `scripts/prerender.mjs`: genera HTML con contenido para conservar el SEO.

React gestiona el estado del menú móvil, carrusel, búsqueda y filtros. Las reservas se abren en un modal compartido desde el inicio y la carta. El formulario usa `FormData` y validación nativa, y prepara los datos en WhatsApp; no crea reservas en un servidor. Las entradas usan Web Animations API e IntersectionObserver, con coreografías por sección; Font Awesome proporciona los iconos. Las fuentes Outfit y DM Sans se cargan desde Google Fonts. Los assets nuevos están en `public/Assets/nakama/`; su mapa se centraliza en `src/data/brand.js`.

Para cambiar un producto, editar `dishes.json`; no duplicar tarjetas. Mantener su `id` estable para conservar los enlaces directos.

## Verificación

```sh
npm test
npm run test:e2e
npm run format
```

Las pruebas de navegador usan Google Chrome instalado y levantan temporalmente el preview en el puerto 4173. Comprueban búsqueda, filtros, navegación móvil, carrusel y reservas en distintas anchuras. No envían mensajes ni pedidos reales.


## Fotografías y reservas

Las 66 fichas tienen imágenes del material entregado, con miniaturas uniformes 4:3 y recorte sin deformación. Al hacer clic se abre la fotografía completa en un visor. El archivo original del local está en `public/Assets/local/LOCALKURO.png` y se copia automáticamente a `dist/Assets/local/LOCALKURO.png` al compilar.

`ReservationProvider` comparte el modal entre todos los botones de reserva. Los enlaces antiguos con `#reserva` también lo abren. El diálogo admite Escape, cierre con botón y restitución del foco, y funciona tanto en móvil como en escritorio.


Las siete fotos más recientes conservan sus originales en `source-assets/carta/` y sus versiones optimizadas en `public/Assets/carta/`. No se amplían los archivos pequeños al optimizar. `MenuPhotoProvider` gestiona un único visor para todas las tarjetas, con cierre por Escape y restitución del foco.


## Animaciones de entrada

La coreografía está centralizada en `src/motion/pageMotion.js`. Cada contexto define su entrada: personajes, sellos, papel, fotografías, cartas y modales. Las animaciones conservan las inclinaciones y efectos hover originales, esperan la carga de las ilustraciones y se ejecutan una vez al entrar en pantalla. Los cambios de promoción y filtros renuevan únicamente el contenido correspondiente. `prefers-reduced-motion` desactiva las entradas y cancela las que estén en curso. El HTML prerenderizado sigue siendo visible sin JavaScript.

## SEO y sitemap

`npm run build` ejecuta `npm run seo` antes de compilar. El generador `scripts/generate-seo.mjs` sincroniza los títulos, descripciones, canonical, Open Graph y Twitter; la carta Schema.org se obtiene de los 66 productos y categorías actuales. Las ofertas con precio «Desde» no se presentan como un precio fijo. No cambia componentes, estilos ni contenido visible.

El dominio canónico conserva la configuración existente: `https://kurosushifusion.com`. Al publicar **todo el contenido de `dist/`**, quedan disponibles:

- `https://kurosushifusion.com/sitemap.xml`: inicio, carta e imágenes, sin duplicar filtros ni enlaces con fragmentos.
- `https://kurosushifusion.com/robots.txt`: permite el rastreo e indica el sitemap.

No se inventan fechas `lastmod` en cada compilación. Referencia: [documentación de Google sobre sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

Después del despliegue, enviar `sitemap.xml` desde la propiedad verificada del dominio en Google Search Console. Subir el código a GitHub no publica el sitio ni envía el sitemap a Google. Si cambia el dominio de producción, actualizarlo en el generador y regenerar antes de publicar. Las pruebas `npm test` verifican metadatos, precios, enlaces canónicos y existencia de las imágenes.

### Publicación actual en Hostinger

El dominio usa hosting estático PHP/HTML. Copiar la rama `main` directamente a `public_html` publica código fuente de Vite y deja la web sin funcionar. Se desactivó esa implementación automática en hPanel: no usar **Redistribuir main** mientras no exista un proceso de compilación previo.

Para actualizar: ejecutar `npm ci` y `npm run build`, y publicar el **contenido** de `dist/` dentro de `public_html`, conservando las carpetas `Assets/`, `bundles/`, `.htaccess`, el sitemap y el archivo de verificación de Google. Después, borrar la caché del dominio en Hostinger y comprobar inicio y carta.

`public/googlef40bd42dd5b67643.html` es el archivo de verificación emitido por Google Search Console. Debe permanecer accesible en la raíz pública y se incluye automáticamente al compilar. No contiene contraseñas ni credenciales privadas.
