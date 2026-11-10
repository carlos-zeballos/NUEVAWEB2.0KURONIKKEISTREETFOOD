import BrandArt from './BrandArt.jsx';
import Icon from './Icon.jsx';
import { whatsappUrl } from '../utils/whatsapp.js';
export default function WhatsAppButton() {
  return (
    <a
      id="whatsapp-float-btn"
      className="whatsapp-float"
      href={whatsappUrl('¡Hola, nakama! Quiero hacer un pedido.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pide por WhatsApp"
    >
      <BrandArt name="kuma" />
      <span>
        ¿SALE UN MAKI? <Icon name="whatsapp" />
      </span>
    </a>
  );
}
