const platforms = [
  {
    name: 'Rappi',
    href: 'https://www.rappi.com.pe/restaurantes/10145-kuro',
    icon: 'Assets/delivery/rappi.png',
  },
  {
    name: 'PedidosYa',
    href: 'https://www.pedidosya.com.pe/restaurantes/arequipa/kuro-sushi-fusion-menu',
    icon: 'Assets/delivery/pedidosya.png',
  },
];

export default function DeliveryLinks() {
  return (
    <div className="hero-delivery">
      <p>Encuéntranos en tu delivery favorito</p>
      <nav className="hero-delivery-links" aria-label="Pide KURO en tu delivery favorito">
        {platforms.map(({ name, href, icon }) => (
          <a key={name} href={href} target="_blank" rel="noopener noreferrer">
            <img src={icon} alt="" width="32" height="32" decoding="async" />
            <span>{name}</span>
            <span className="hero-delivery-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}
