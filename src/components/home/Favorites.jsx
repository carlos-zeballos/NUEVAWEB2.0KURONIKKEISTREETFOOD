import KitchenPosts from '../KitchenPosts.jsx';
import BrandArt from '../BrandArt.jsx';
import Icon from '../Icon.jsx';

const favorites = [
  {
    name: 'MAKIS CON ACTITUD',
    category: 'CLÁSICOS & KUREIZI',
    image: 'Assets/fotos/principal-clasicos.webp',
    href: 'makis-clasicos',
    label: 'Encuentra tu roll ideal',
    tag: 'EL CRUSH DE TODOS',
    color: 'yellow',
  },
  {
    name: 'EL PLAN COMPLETO',
    category: 'PROMOCIONES PARA TUS NAKAMAS',
    image: 'Assets/fotos/principal-promos.webp',
    href: 'combos',
    label: 'Hoy se comparte (o no)',
    tag: 'PARA EL HAMBRE REAL',
    color: 'orange',
  },
  {
    name: 'TORTA DE MAKIS',
    category: 'PARA CELEBRAR EN GRANDE · S/120',
    image: 'Assets/fotos/torta-de-maki.webp',
    href: 'torta-de-makis',
    label: '4 tablas, 4 salsas y 5 pares de palillos. Pídela con 24 h de anticipación',
    tag: 'HAPPY MAKI DAY',
    color: 'cream',
  },
];
export default function Favorites() {
  return (
    <section id="favoritos-comunidad" className="favorites section-space shell">
      <div className="section-heading">
        <div>
          <span className="eyebrow">EL ANTOJO TIENE NOMBRE</span>
          <h2>
            ¡HICIMOS MATCH!
            <br />
            VAMOS POR <span className="text-orange">MAKIS.</span>
          </h2>
        </div>
        <div className="heading-note">
          <BrandArt name="maki" />
          <p>
            ¿Team clásico o team atrevido?
            <br />
            Aquí hay un favorito para cada mood.
          </p>
        </div>
      </div>
      <div className="favorites-grid">
        {favorites.map((item) => (
          <a
            href={`menu.html#${item.href}`}
            className={`favorite-card favorite-card--${item.color}`}
            key={item.name}
          >
            <div className="favorite-photo">
              <img src={item.image} alt={item.label} loading="lazy" />
              <span className="card-sticker">{item.tag}</span>
            </div>
            <div className="favorite-copy">
              <span className="eyebrow">{item.category}</span>
              <h3>{item.name}</h3>
              <div>
                <p>{item.label}</p>
                <span className="card-arrow">
                  <Icon name="arrow" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="section-bottom">
        <span>Muchos sabores. Un solo buen plan.</span>
        <a href="menu.html" className="text-link">
          Explorar toda la carta <Icon name="arrow" />
        </a>
      </div>
      <KitchenPosts excludeIds={['godzilla']} />
    </section>
  );
}
