# Kuro — Nikkei con actitud

La nueva dirección usa la identidad de las referencias KURO NAKAMA, con una composición propia para el sitio y la carta.

## Identidad

- **Crema `#FFF4DC`**: fondo cálido, luminoso y cercano.
- **Amarillo `#FFC71E`**: botones, bloques de marca y pequeños acentos.
- **Naranja `#FF7718`**: palabras protagonistas y secciones de energía.
- **Tinta `#171710`**: tipografía, contornos y bloques de contraste.
- **Outfit** en titulares: sans serif geométrica y contundente, con pesos altos.
- **DM Sans** en texto: lectura clara para descripciones, formularios y navegación.

Las referencias son imágenes y no incluyen fuentes originales. La selección tipográfica aproxima su carácter, sin afirmar que sean las fuentes exactas.

## Composición

La portada combina un titular editorial con una fotografía grande y stickers de la marca. Las secciones alternan crema, amarillo y tinta, con contornos finos y movimientos cortos. Kuma y Ukuku participan en la bienvenida, la historia, el club, la reserva y el acceso a WhatsApp. Se emplean los diez assets proporcionados; las fotografías se optimizaron para web y las ilustraciones conservan su transparencia.

La carta tiene navegación por categorías, búsqueda sin distinción de tildes, filtros combinables por sabor y tarjetas con imagen, descripción, precio y pedido directo. Los 66 productos y sus precios se conservan. En móvil, los botones de categoría se desplazan horizontalmente y las tarjetas usan dos columnas; en pantallas muy estrechas pasan a una.

El club dirige al programa Nakama existente; no se simulan cuentas ni puntos. Las reservas mantienen la validación de fechas y la confirmación por WhatsApp con el aviso de pago de S/20. El movimiento respeta la preferencia de movimiento reducido del dispositivo.

## Archivos principales

Los tokens y estilos están en `src/styles/brand.css`, el mapa de assets en `src/data/brand.js`, y el catálogo en `src/data/dishes.json`.

## Elementos de PLANTILLA KURO POST

Se incorporaron los posts de Loncco, Chicha y Godzilla como una galería editorial secundaria en el inicio y la carta, conservando la composición principal, la paleta y las fuentes. Las piezas completas se optimizaron en JPEG y están en `public/Assets/posts/`. Sus enlaces llevan al producto correspondiente. Las etiquetas incorporan pequeños bordes de papel rasgado inspirados en las plantillas.

Los precios permanecen centralizados en el catálogo; estas tres piezas no contienen precios promocionales incrustados.

## Carrusel de promociones

La portada rota nueve combos y promociones del catálogo cada 10 segundos, sincronizando titular, fotografía, precio y pedido por WhatsApp. Incluye selectores, controles anterior/siguiente y pausa; se detiene durante la interacción y con la pestaña oculta, y respeta la preferencia de movimiento reducido. Los precios se consultan desde `dishes.json`; las campañas y sus textos se configuran en `src/data/promotions.js`.

La sección del mejor match invita a la crew a visitar Kuro y reservar una mesa.

## Selección fotográfica

El catálogo completo utiliza las imágenes del paquete original entregado y los posts fotográficos suministrados. Las 66 fichas tienen una imagen asociada y miniaturas de proporción 4:3, con un punto de encuadre ajustable por producto. Cada fotografía se abre completa en un visor accesible al tocarla. Las tomas referenciales se identifican cuando corresponden; los precios y datos de pedido siguen centralizados en el catálogo.

## Fotografías sin duplicados por página

Cada una de las nueve campañas del carrusel tiene una imagen distinta. Los destacados del inicio utilizan otras tomas; el post de Godzilla se muestra en el carrusel y se excluye de la galería del inicio. La sección de ubicación utiliza la foto de Yanahuara. En la carta se eliminó la galería secundaria que repetía las fotografías ya presentes en las fichas.

Las fotografías gastronómicas se comprobaron por URL y por contenido de archivo: no hay duplicados dentro del inicio ni dentro de la carta. La identidad compartida —logotipo y personajes— se mantiene.


## Reservas y fotografía del local

La sección «¡La mesa está servida! Itadakimasu!!!» abre el formulario en un diálogo compartido, sustituyendo la sección de reserva duplicada. El diálogo utiliza la ilustración de Ukuku, conserva la identidad amarilla/crema y permite preparar el mensaje de reserva por WhatsApp. Se mantienen las validaciones de fechas y horario y el aviso de pago existente.

«Nos vemos en Kuro» muestra la fotografía suministrada `LOCALKURO.png`, conservada dentro del proyecto para producción. La cabecera de la carta dice «¡Cuidado! Imágenes altamente adictivas» y «Conoce nuestro menú».


## Tamaño uniforme de fotografías

Las miniaturas de la carta usan un marco fijo 4:3 y `object-fit: cover`, sin estirar la fotografía. El campo `image.position` permite ajustar el punto de encuadre de las tomas verticales. El visor muestra la imagen completa con `object-fit: contain`. Las nuevas fotos de Miso Kuro, Oniguiris, causas, Cusqueña, After Office, Bento 3 y refresher conservan copias originales en `source-assets/carta/`; las versiones para la web se limitan a 1600 px sin ampliar imágenes pequeñas.

## Movimiento por contexto

La coreografía de entrada está centralizada en `src/motion/pageMotion.js` y usa Web Animations API con IntersectionObserver.

| Contexto | Entrada |
| --- | --- |
| Hero y promociones | Titular en tres tiempos, trazo del subrayado, precio como etiqueta y foto con acercamiento suave; los afiches completos entran sin ampliarse fuera del marco. |
| Personaje sorprendido | Aparición con un rebote corto y asentamiento, coordinada con el sello de la promo. |
| Nakama Club | Halo que se abre, Kuma que entra a escena y sello de fidelidad que se coloca como papel. |
| La mesa está servida | La pareja de personajes aparece como anfitriona; el mensaje y la reserva mantienen su lectura. |
| Carta | Fotografías con aparición escalonada por fila; marcos y botones mantienen su posición y tamaño. |
| Posts editoriales | Entrada de las tarjetas como piezas impresas y etiquetas con movimiento de papel. |
| Local | Aparición suave de la fotografía y su rótulo; se conserva el encuadre completo. |
| Ilustración final del menú | Entrada de la escena de la barra desde abajo, con escala y giro contenidos. |
| Modales | Aparición breve del diálogo y fundido de la fotografía ampliada. |
| Logotipo y WhatsApp | Entradas discretas para conservar la orientación y el acceso al pedido. |

Las entradas se ejecutan una vez al aparecer en pantalla. Los cambios de promo, los filtros y las reaperturas de un modal renuevan solo su contenido. Se conserva el giro original de cada ilustración mediante las propiedades individuales de transformación. No se añade movimiento continuo a las fotografías o personajes. La preferencia de movimiento reducido desactiva las entradas, incluso si se cambia durante una animación. Sin JavaScript, el contenido prerenderizado permanece visible.


## Ritmo pausado y continuidad

Las entradas principales duran entre 1,2 y 1,9 segundos, con aceleración gradual y rebotes contenidos. Los textos y grupos permanecen opacos; las fotografías y personajes parten de una opacidad alta para evitar destellos y dobles fundidos.

El marco del hero entra una sola vez. En cada cambio se conserva la fotografía anterior debajo de la nueva durante un fundido de 1,2 segundos. El cambio espera a que la nueva foto esté decodificada; cada promoción dispone de al menos 10 segundos. Los filtros no reinician la entrada de una foto que continúa visible.
