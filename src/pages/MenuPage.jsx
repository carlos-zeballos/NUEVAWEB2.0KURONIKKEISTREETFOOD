import { ReservationButton } from '../components/ReservationProvider.jsx';
import { useEffect, useMemo, useState } from 'react';
import MenuCategory from '../components/menu/MenuCategory.jsx';
import BrandArt from '../components/BrandArt.jsx';
import Icon from '../components/Icon.jsx';
import categories from '../data/categories.json';
import dishes from '../data/dishes.json';
import { brandAssets, flavors as flavorOptions } from '../data/brand.js';
import { filterDishes } from '../utils/menu.js';
import { scrollToSection } from '../utils/navigation.js';

export default function MenuPage() {
  const [query, setQuery] = useState('');
  const [flavors, setFlavors] = useState([]);
  const [categoryId, setCategoryId] = useState('all');
  const visible = useMemo(
    () =>
      filterDishes(dishes, query, flavors).filter(
        (dish) => categoryId === 'all' || dish.categoryId === categoryId,
      ),
    [query, flavors, categoryId],
  );
  const visibleIds = useMemo(() => new Set(visible.map((dish) => dish.id)), [visible]);
  const filtered = query.trim() !== '' || flavors.length > 0 || categoryId !== 'all';
  const clear = () => {
    setQuery('');
    setFlavors([]);
    setCategoryId('all');
  };
  const toggleFlavor = (flavor) =>
    setFlavors((current) =>
      current.includes(flavor) ? current.filter((item) => item !== flavor) : [...current, flavor],
    );
  useEffect(() => {
    let frame;
    const navigateToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const category = categories.find((item) => item.id === id);
      const dish = dishes.find((item) => item.id === id);
      if (category || dish) {
        setCategoryId(category?.id || dish.categoryId);
        setQuery('');
        setFlavors([]);
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => scrollToSection(id));
    };
    navigateToHash();
    window.addEventListener('hashchange', navigateToHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', navigateToHash);
    };
  }, []);
  return (
    <main className="menu-page">
      <section className="menu-hero shell">
        <div>
          <span className="eyebrow">CONOCE NUESTRO MENÚ</span>
          <h1 className="menu-warning-title">
            ¡CUIDADO!
            <br />
            <span>IMÁGENES ALTAMENTE ADICTIVAS.</span>
          </h1>
          <p>
            Clásicos que enamoran. Kureizis que sorprenden.
            <br />
            Elige tu antojo y nosotros nos encargamos del resto.
          </p>
          <div className="menu-hero-note">
            <span>66 OPCIONES PARA TU MOOD</span>
            <span>HECHO AL MOMENTO ↗</span>
          </div>
        </div>
        <div className="menu-hero-art">
          <BrandArt name="ukuku" alt="Ukuku te invita a descubrir la carta Kuro" eager />
          <span className="menu-hero-sticker">
            AQUÍ NO
            <br />
            HAY MALAS
            <br />
            DECISIONES. ↗
          </span>
        </div>
      </section>
      <div className="menu-browser shell">
        <div className="category-tabs" role="group" aria-label="Categorías de la carta">
          <button
            className={categoryId === 'all' ? 'active' : ''}
            aria-pressed={categoryId === 'all'}
            onClick={() => setCategoryId('all')}
          >
            Toda la carta <span>66</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={categoryId === category.id ? 'active' : ''}
              aria-pressed={categoryId === category.id}
              onClick={() => setCategoryId(category.id)}
            >
              {category.title}
            </button>
          ))}
        </div>
        <div className="search-container">
          <div className="search-row">
            <div>
              <span className="eyebrow">¿QUÉ SE TE ANTOJA HOY?</span>
              <h2>ENCUENTRA TU MATCH.</h2>
            </div>
            <div className="search-field">
              <Icon name="search" />
              <input
                type="search"
                id="buscar-plato"
                aria-label="Buscar platos"
                placeholder="Un maki, unas gyozas, un combo…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && visible[0]) scrollToSection(visible[0].id);
                }}
              />
              {query && (
                <button onClick={() => setQuery('')} aria-label="Borrar texto de búsqueda">
                  <Icon name="close" />
                </button>
              )}
            </div>
          </div>
          <div className="flavor-row">
            <span>ELIGE TU MOOD</span>
            <div className="flavor-filter">
              {flavorOptions.map((flavor) => (
                <button
                  key={flavor.id}
                  className={`flavor-btn ${flavors.includes(flavor.id) ? 'active' : ''}`}
                  aria-pressed={flavors.includes(flavor.id)}
                  onClick={() => toggleFlavor(flavor.id)}
                  data-sabor={flavor.id}
                >
                  <span>{flavor.emoji}</span>
                  {flavor.label}
                </button>
              ))}
            </div>
          </div>
          <div className="results-toolbar">
            <span id="contador" role="status" aria-live="polite">
              {filtered
                ? `✨ Mostrando ${visible.length} plato${visible.length === 1 ? '' : 's'}`
                : 'Deja que el antojo decida. Aquí está toda la carta.'}
            </span>
            {filtered && (
              <button className="clear-filters" onClick={clear}>
                Limpiar filtros <Icon name="close" />
              </button>
            )}
            <span className="menu-currency">PRECIOS EN SOLES · S/</span>
          </div>
        </div>
        <div id="menu-results" data-motion-key={`${categoryId}:${query}:${flavors.join('|')}`}>
          {visible.length === 0 && (
            <div className="no-results show" id="sin-resultados">
              <BrandArt name="surprise" />
              <span className="eyebrow">UPSS… ESE ANTOJO SE NOS ESCONDIÓ</span>
              <h2>PROBEMOS OTRO MOOD.</h2>
              <p>No encontramos platos con esa combinación. Hay mucho más por descubrir.</p>
              <button onClick={clear} className="btn btn-ink">
                Limpiar búsqueda <Icon name="arrow" />
              </button>
            </div>
          )}
          {categories.map((category, index) => (
            <MenuCategory
              key={category.id}
              category={category}
              dishes={dishes}
              visibleIds={visibleIds}
              index={index}
            />
          ))}
        </div>
        <div className="menu-end">
          <img
            className="menu-end-illustration"
            src={brandAssets.barDuo}
            alt="Kuma y Ukuku en la barra de Kuro, con una tabla de makis y un ramen"
            loading="lazy"
            decoding="async"
            width="1254"
            height="1254"
          />
          <div>
            <span className="eyebrow">EL ANTOJO NO ESPERA</span>
            <h2>
              ¿YA SABES
              <br />
              QUÉ VAS A PEDIR?
            </h2>
            <p>El botón de cada plato te lleva directo a nuestro WhatsApp. Sin vueltas.</p>
            <ReservationButton className="btn btn-ink">
              MEJOR, RESERVO UNA MESA <Icon name="arrow" />
            </ReservationButton>
          </div>
        </div>
      </div>
    </main>
  );
}
