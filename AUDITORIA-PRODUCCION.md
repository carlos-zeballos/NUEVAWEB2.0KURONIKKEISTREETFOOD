# Auditoría de producción — KURO

Fecha: 10 de noviembre de 2026. Dominio auditado: https://kurosushifusion.com/.

La web está operativa. La búsqueda, navegación móvil, visor de fotos y modal de reserva funcionan en producción. El diseño, los textos visibles y los assets aprobados se conservaron.

## Correcciones aplicadas en producción

| Hallazgo | Corrección | Verificación pública |
| --- | --- | --- |
| `www` mostraba una copia del sitio | Redirección permanente al dominio sin `www` | HTTP 301 a `https://kurosushifusion.com/` |
| `/index.html` duplicaba el inicio | Redirección permanente a `/`, conservando parámetros | HTTP 301 |
| HTML, sitemap y robots se almacenaban 48 horas | Revalidación con `Cache-Control: no-cache, max-age=0, must-revalidate` | Cabeceras comprobadas tras limpiar caché |
| Archivos del despliegue Git anterior eran públicos | Bloqueo de directorios de desarrollo, originales, configuración y documentación | `/package.json`, `/src/data/dishes.json`, `/source-assets/carta/misokuro.jpg`: HTTP 403 |

Las reglas están en `public/.htaccess`, se incluyen en el build y se publicaron mediante el administrador de archivos de Hostinger. No se eliminaron los originales del proyecto. `.git` ya estaba bloqueado antes de esta auditoría; no se encontró evidencia de credenciales expuestas en las rutas comprobadas. No se realizó una prueba de penetración completa.

## Comprobaciones funcionales y SEO

- Inicio y carta: HTTP 200, un `h1` por página, canonical correcto y sin errores de JavaScript en el recorrido probado.
- Móvil 390 × 844: sin desbordamiento horizontal; menú abre y cierra con Escape.
- Búsqueda «miso»: devuelve tres fichas. Foto ampliada y reserva abren y cierran correctamente. No se enviaron pedidos, mensajes ni reservas reales.
- 69 imágenes del catálogo y recursos principales respondieron correctamente en la comprobación de publicación. El inicio tenía 44 elementos de imagen y la carta 84; no se detectaron imágenes sin atributo `alt` en las páginas auditadas.
- `robots.txt`, `sitemap.xml` y archivo HTML de verificación de Google: HTTP 200. XML válido y dos URLs canónicas, sin generar páginas falsas para filtros o fragmentos.
- Search Console: propiedad verificada; sitemap enviado y leído el 10/11/2026, estado **Correcto**, dos páginas descubiertas. Esto no garantiza indexación o posicionamiento inmediato.
- HTTPS funciona y HTTP redirige a HTTPS. Una ruta inexistente devuelve un 404 real. No se afirma que la página de error esté personalizada para KURO.
- `npm audit --omit=dev`: cero vulnerabilidades conocidas en dependencias de producción al consultar el registro. No equivale a ausencia de todos los riesgos ni incluye dependencias de desarrollo.
- Build y siete pruebas automatizadas: correctos. Las reglas Apache se probaron en Hostinger, no en el preview de Vite.

## Rendimiento y accesibilidad

Lighthouse 13.6.0, mediciones **secuenciales** sobre las URLs públicas, perfil móvil simulado. Hora UTC: 09:08. Son pruebas de laboratorio; no representan por sí solas las métricas de visitantes reales. La consulta inicial a la API pública de PageSpeed fue rechazada por cuota; los informes finales se obtuvieron con Lighthouse local.

| Métrica | Inicio | Carta |
| --- | --- | --- |
| Rendimiento | 85/100 | 82/100 |
| Accesibilidad automatizada | 91/100 | 92/100 |
| Buenas prácticas | 100/100 | 100/100 |
| SEO técnico automatizado | 100/100 | 100/100 |
| LCP | 4,1 s | 4,5 s |
| CLS | 0 | 0 |
| Bloqueo total (TBT) | 0 ms | 30 ms |

Informes completos: [inicio](audits/2026-11-10/inicio.html) y [carta](audits/2026-11-10/carta.html). Descargar y abrir en un navegador para verlos interactivos.

El LCP aún necesita mejorar. Lighthouse estima un ahorro de imágenes de unos 915 KiB en inicio y 1.044 KiB en carta para el recorrido medido. Son estimaciones de esa carga inicial, no de toda la carta. No se midió INP de usuarios reales. Referencia: [Google sobre Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).

## Pendientes priorizados

1. **Imágenes adaptables y peso inicial.** Generar variantes responsive de las mismas fotos e ilustraciones, con `srcset`/`sizes`, dimensiones explícitas y carga prioritaria solo donde corresponde. Optimizar fuentes e iconos. Conservar los originales y la identidad visual. Las ilustraciones Kuma y Ukuku, por ejemplo, se descargan a mayor resolución de la necesaria en móvil.
2. **Accesibilidad.** El naranja actual sobre crema no alcanza el contraste exigido en varios titulares. Revisar una variante de color accesible con aprobación visual; no se cambió la paleta durante esta auditoría. Aumentar las áreas de pulsación de los puntos del carrusel y enlaces de teléfono/email. El nombre accesible del botón flotante de WhatsApp debe incluir su texto visible «¿SALE UN MAKI?». La puntuación automática no sustituye una revisión completa con teclado y lector de pantalla.
3. **Medición de resultados.** No se detectó una etiqueta de GA4/Google Tag Manager en las páginas auditadas. Configurar una propiedad autorizada y eventos para clic en WhatsApp, apertura de reservas y envío a WhatsApp. Un clic o un envío a WhatsApp no prueba una venta ni una reserva confirmada. Search Console mide búsqueda orgánica y no sustituye esta medición.
4. **Despliegue automático correcto.** Actualmente está desactivada la copia automática de `main` que rompía la web. Implantar un flujo que ejecute `npm ci`, pruebas y build, y publique únicamente `dist/`. Hasta entonces, usar publicación manual del build; no pulsar «Redistribuir main» en la integración actual.
5. **SEO local y observación.** Comprobar acceso y datos de la ficha de Google Business Profile, dirección, marcador, horario y enlaces; la ficha no fue administrada en esta auditoría. Revisar indexación y Core Web Vitals en Search Console cuando haya datos suficientes. No se verificó una restauración de backup ni se hicieron cambios en DNS, correo o pagos.

No se añadieron herramientas de seguimiento, nuevas cuentas, cambios de diseño ni integraciones de pago durante esta auditoría.
