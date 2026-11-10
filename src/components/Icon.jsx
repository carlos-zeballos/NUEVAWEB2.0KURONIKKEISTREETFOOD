export default function Icon({ name = 'arrow-up-right', className = '' }) {
  const icons = {
    'arrow-up-right': 'fas fa-arrow-up-right-from-square',
    arrow: 'fas fa-arrow-right',
    whatsapp: 'fab fa-whatsapp',
    instagram: 'fab fa-instagram',
    facebook: 'fab fa-facebook-f',
    pin: 'fas fa-map-marker-alt',
    clock: 'far fa-clock',
    search: 'fas fa-search',
    plus: 'fas fa-plus',
    close: 'fas fa-times',
    menu: 'fas fa-bars',
    chevron: 'fas fa-chevron-down',
    check: 'fas fa-check',
    star: 'fas fa-star',
  };
  return <i className={`${icons[name] || icons.arrow} ${className}`} aria-hidden="true" />;
}
