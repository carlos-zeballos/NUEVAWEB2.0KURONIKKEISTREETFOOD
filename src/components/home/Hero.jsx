import { useCallback, useEffect, useRef, useState } from 'react';
import { promotions } from '../../data/promotions.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import BrandArt from '../BrandArt.jsx';
import Icon from '../Icon.jsx';
import DeliveryLinks from '../DeliveryLinks.jsx';

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const imageRefs = useRef([]);
  const transitionRequest = useRef(0);
  const [previousSlide, setPreviousSlide] = useState(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [autoplayAllowed, setAutoplayAllowed] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const promotion = promotions[slide];
  const showSlide = useCallback(
    async (index) => {
      const request = ++transitionRequest.current;
      if (index === slide) return;
      // Keep the current picture in place until its replacement is decoded.
      try {
        await imageRefs.current[index]?.decode();
      } catch {
        return;
      }
      if (request !== transitionRequest.current) return;
      setPreviousSlide(slide);
      setSlide(index);
    },
    [slide],
  );
  useEffect(
    () => () => {
      transitionRequest.current++;
    },
    [],
  );
  const rotating = autoplayAllowed && !paused && !hovered && !focused && pageVisible;

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setAutoplayAllowed(!motion.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    motion.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      motion.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);
  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => {
      showSlide((slide + 1) % promotions.length);
    }, 10000);
    return () => window.clearTimeout(timer);
  }, [slide, rotating, showSlide]);
  useEffect(() => {
    if (previousSlide === null) return;
    const timer = window.setTimeout(() => setPreviousSlide(null), 1300);
    return () => window.clearTimeout(timer);
  }, [slide, previousSlide]);

  return (
    <section
      id="inicio"
      className="hero shell"
      aria-roledescription="carrusel"
      aria-label="Promociones Kuro"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div
        className="hero-copy"
        data-motion-key={promotion.id}
        aria-live={rotating ? 'off' : 'polite'}
        aria-atomic="true"
      >
        <span className="eyebrow">
          PROMOS PARA TU CREW{' '}
          <span className="promo-counter">
            {String(slide + 1).padStart(2, '0')} / {String(promotions.length).padStart(2, '0')}
          </span>
        </span>
        <h1 className="promo-headline">
          {promotion.headline.map((line, index) => (
            <span
              key={`${promotion.id}-${index}`}
              className={`hero-headline-line ${index === promotion.headline.length - 1 ? 'orange-word' : ''} ${line.length > 11 ? 'hero-headline-line--long' : ''}`}
            >
              {line}
              {index === 2 && (
                <svg viewBox="0 0 440 20" fill="none" aria-hidden="true">
                  <path
                    d="M4 13C121 1 273 1 435 9M70 18C202 10 320 12 410 16"
                    pathLength="1"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </span>
          ))}
        </h1>
        <div className="hero-promo-price">
          <span>{promotion.name}</span>
          <strong>{promotion.price}</strong>
        </div>
        <p className="promo-description">{promotion.copy}</p>
        <div className="hero-actions">
          <a
            href={whatsappUrl(`¡Hola, Kuro! Quiero pedir la promo ${promotion.orderName}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ink"
          >
            {promotion.cta} <Icon name="whatsapp" />
          </a>
          <a href={`menu.html#${promotion.id}`} className="text-link">
            Ver detalle <span className="circle-arrow">↗</span>
          </a>
        </div>
        <DeliveryLinks />
      </div>
      <div className="hero-visual">
        <div className="hero-photo-frame" id="hero-gallery" data-motion-key={promotion.id}>
          {promotions.map((item, index) => (
            <img
              key={item.id}
              ref={(element) => {
                imageRefs.current[index] = element;
              }}
              className={`hero-photo ${slide === index ? 'active' : previousSlide === index ? 'outgoing' : ''}`}
              src={item.image}
              style={item.imageFit ? { objectFit: item.imageFit } : undefined}
              alt={item.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              aria-hidden={slide !== index}
            />
          ))}
        </div>
        <div className="sun-sticker" aria-label="Promos con actitud">
          <span>
            PROMOS
            <br />
            CON ACTITUD
            <br />
            <small>100% KURO</small>
          </span>
        </div>
        <BrandArt name="surprise" className="hero-mascot" eager />
        <div className="photo-caption">
          <span className="live-dot" />
          <span>
            {promotion.name.toUpperCase()}
            <small className="promo-photo-source">FOTOGRAFÍA REFERENCIAL</small>
          </span>
          <span>↗</span>
        </div>
        <div className="hero-pagination" role="group" aria-label="Controles de promociones">
          <button
            className="gallery-arrow"
            onClick={() => showSlide((slide - 1 + promotions.length) % promotions.length)}
            aria-label="Promoción anterior"
          >
            ←
          </button>
          {promotions.map((item, index) => (
            <button
              key={item.id}
              onClick={() => showSlide(index)}
              className={`promo-dot ${slide === index ? 'active' : ''}`}
              aria-label={`Ver promoción ${index + 1}: ${item.name}`}
              aria-pressed={slide === index}
            />
          ))}
          <button
            className="gallery-arrow"
            onClick={() => showSlide((slide + 1) % promotions.length)}
            aria-label="Siguiente promoción"
          >
            →
          </button>
          {autoplayAllowed && (
            <button
              className="gallery-pause"
              onClick={() => setPaused((current) => !current)}
              aria-label={paused ? 'Reanudar promociones' : 'Pausar promociones'}
              aria-pressed={paused}
            >
              {paused ? '▶' : 'Ⅱ'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
