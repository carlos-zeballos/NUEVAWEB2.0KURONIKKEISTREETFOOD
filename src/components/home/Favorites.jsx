import KitchenPosts from '../KitchenPosts.jsx';
import { brandAssets } from '../../data/brand.js';
import BrandArt from '../BrandArt.jsx';
import Icon from '../Icon.jsx';

const favorites = [
  {
    name: 'MAKIS CON ACTITUD',
    category: 'CLÁSICOS & KUREIZI',
    image: 'Assets/img/cauche.png',
    href: 'makis-clasicos',
    label: 'Encuentra tu roll ideal',
    tag: 'EL CRUSH DE TODOS',
    color: 'yellow',
  },
  {
    name: 'EL PLAN COMPLETO',
    category: 'COMBOS PARA TU CREW',
    image: 'Assets/img/tataki.png',
    href: 'combos',
    label: 'Hoy se comparte (o no)',
    tag: 'PARA EL HAMBRE REAL',
    color: 'orange',
  },
  {
    name: 'CRUNCH. Y OTRA MÁS.',
    category: 'ENTRADAS QUE ENGANCHAN',
    image: brandAssets.gyozas,
    href: 'entradas',
    label: 'Empieza con unas gyozas',
    tag: 'UN BOCADO MÁS',
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
        {favorites.map((item, index) => (
          <a
            href={`menu.html#${item.href}`}
            className={`favorite-card favorite-card--${item.color}`}
            key={item.name}
          >
            <div className="favorite-photo">
              <img src={item.image} alt={item.label} loading="lazy" />
              <span className="card-sticker">{item.tag}</span>
              <span className="card-index">0{index + 1}</span>
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
