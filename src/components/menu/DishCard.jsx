import { useMenuPhoto } from './MenuPhotoProvider.jsx';
import { openWhatsApp } from '../../utils/whatsapp.js';
import Icon from '../Icon.jsx';

export default function DishCard({ dish, hidden }) {
  const openPhoto = useMenuPhoto();
  return (
    <article
      id={dish.id}
      className={`plato-item dish-card ${dish.image ? '' : 'dish-card--text'} ${hidden ? 'oculto' : ''}`}
      hidden={hidden}
    >
      {dish.image && (
        <div className="dish-image">
          <button
            type="button"
            className="dish-photo-button"
            aria-label={`Ver fotografía completa de ${dish.name}`}
            aria-haspopup="dialog"
            onClick={() => openPhoto(dish)}
          >
            <img
              src={dish.image.src}
              alt={dish.image.alt || dish.name}
              style={{ objectPosition: dish.image.position || '50% 50%' }}
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
            />
            <span className="dish-photo-expand" aria-hidden="true">
              ↗
            </span>
          </button>
          {dish.badge && <span className="dish-badge">{dish.badge}</span>}
          {dish.image.note && <span className="dish-photo-note">{dish.image.note}</span>}
        </div>
      )}
      <div className="dish-copy">
        {!dish.image && dish.badge && <span className="dish-text-badge">{dish.badge}</span>}
        <h3>{dish.name}</h3>
        <p>
          {Array.isArray(dish.description)
            ? dish.description.map((part, index) =>
                typeof part === 'string' ? part : <strong key={index}>{part.strong}</strong>,
              )
            : dish.description}
        </p>
        <div className="dish-bottom">
          <span className="dish-price">{dish.price}</span>
          <button
            className="dish-order"
            type="button"
            onClick={() => openWhatsApp(`Hola, quisiera realizar un pedido de: ${dish.orderName}`)}
            aria-label={`Pedir ${dish.name}`}
          >
            <span>PEDIR</span>
            <Icon name="plus" />
          </button>
        </div>
      </div>
    </article>
  );
}
