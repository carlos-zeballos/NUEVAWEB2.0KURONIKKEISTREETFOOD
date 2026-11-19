import dishes from './dishes.json';

// Prices and ordering names always come from the same catalogue as the menu.
const campaigns = [
  {
    id: '30-rolls',
    headline: ['30 ROLLS.', 'CERO', 'EXCUSAS.'],
    copy: '30 rolls, 3 sabores seleccionados y 2 salsas. El antojo de los nakamas ya tiene plan.',
    image: 'Assets/fotos/30-rolls.webp',
    cta: 'QUIERO ESTA PROMO',
  },
  {
    id: 'after-office',
    image: 'Assets/fotos/after-office.webp',
    headline: ['CIERRA', 'LA LAPTOP.', 'ABRE KURO.'],
    copy: '10 rolls en 2 sabores, una cerveza artesanal o un cóctel y 2 salsas. Así se cierra el día.',
    cta: 'QUIERO MI AFTER',
  },
  {
    id: '4x3-en-makis',
    headline: ['PIDE 4.', 'PAGA 3.', 'ASÍ, SÍ.'],
    copy: '40 rolls en 4 tablas. Pagas las 3 de mayor precio. Incluye 3 salsas para acompañar.',
    image: 'Assets/fotos/4x3.webp',
    cta: 'VOY POR EL 4X3',
  },
  {
    id: 'nakama',
    image: 'Assets/fotos/nakama.webp',
    headline: ['TU DÚO.', '20 ROLLS.', 'EL MATCH.'],
    copy: '20 rolls en 2 sabores de la carta, 2 salsas y 2 pares de palillos. Arma el plan para dos.',
    cta: 'QUIERO EL NAKAMA',
  },
  {
    id: 'bento-3',
    image: 'Assets/fotos/bento-3.webp',
    headline: ['MAKIS.', 'GYOZAS.', 'PLANAZO.'],
    copy: '10 rolls en 2 sabores, 2 gyozas y 2 salsas. Clásicos a elegir; otros makis con adicional.',
    cta: 'QUIERO EL BENTO 3',
  },
  {
    id: 'bento-1',
    image: 'Assets/fotos/bento-1.webp',
    headline: ['EL BENTO.', 'EL ANTOJO.', 'RESUELTO.'],
    copy: '10 rolls de maki, 5 causa rolls y 2 salsas. Clásicos a elegir; otros makis con adicional.',
    cta: 'QUIERO EL BENTO 1',
  },
  {
    id: 'bento-2',
    image: 'Assets/fotos/bento-2.webp',
    headline: ['HOY TOCA', 'GODZILLA.', 'Y MAKIS.'],
    copy: 'Un Godzilla, 5 rolls de maki y 2 salsas. Clásicos a elegir; otros makis con adicional.',
    cta: 'QUIERO EL BENTO 2',
  },
  {
    id: 'barco-nikkei',
    image: 'Assets/fotos/barco.webp',
    headline: ['TUS', 'NAKAMAS', 'A BORDO.'],
    copy: '30 rolls en 3 sabores de la carta, 3 salsas y 3 pares de palillos. Todos a bordo.',
    cta: 'QUIERO EL BARCO',
  },
  {
    id: 'puente-nikkei',
    image: 'Assets/fotos/puente.webp',
    headline: ['¡60 ROLLS', 'PARA UN', 'EQUIPO VORAZ!'],
    copy: '60 rolls en 6 sabores y 5 salsas. Reúne a tus nakamas: el Puente Nikkei pone los makis.',
    cta: 'QUIERO EL PUENTE',
  },
];

export const promotions = campaigns.map((campaign) => {
  const dish = dishes.find((item) => item.id === campaign.id);
  if (!dish) throw new Error(`Missing promotion product: ${campaign.id}`);
  return {
    ...campaign,
    name: dish.name,
    price: dish.price,
    orderName: dish.orderName,
    image: campaign.image,
    alt: `Fotografía de ${dish.name} de Kuro.`,
  };
});
