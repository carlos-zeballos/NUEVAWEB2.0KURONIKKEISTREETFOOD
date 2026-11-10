import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Icon from '../Icon.jsx';

const MenuPhotoContext = createContext(null);

export function useMenuPhoto() {
  const openPhoto = useContext(MenuPhotoContext);
  if (!openPhoto) throw new Error('Dish cards must be inside MenuPhotoProvider');
  return openPhoto;
}

export default function MenuPhotoProvider({ children }) {
  const [dish, setDish] = useState(null);
  const dialogRef = useRef(null);
  const openPhoto = useCallback((item) => setDish(item), []);
  const closePhoto = () => setDish(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dish || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [dish]);
  return (
    <MenuPhotoContext.Provider value={openPhoto}>
      {children}
      <dialog
        ref={dialogRef}
        className="menu-photo-dialog"
        aria-labelledby="menu-photo-title"
        onCancel={(event) => {
          event.preventDefault();
          closePhoto();
        }}
        onClose={closePhoto}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePhoto();
        }}
      >
        {dish && (
          <div className="menu-photo-content">
            <header>
              <div>
                <span className="eyebrow">MÍRALO DE CERCA</span>
                <h2 id="menu-photo-title">{dish.name}</h2>
              </div>
              <button
                type="button"
                className="menu-photo-close"
                aria-label="Cerrar fotografía"
                onClick={closePhoto}
              >
                <Icon name="close" />
              </button>
            </header>
            <img src={dish.image.src} alt={dish.image.alt || dish.name} decoding="async" />
            <footer>
              <span>Fotografía completa</span>
              <strong>{dish.price}</strong>
            </footer>
          </div>
        )}
      </dialog>
    </MenuPhotoContext.Provider>
  );
}
