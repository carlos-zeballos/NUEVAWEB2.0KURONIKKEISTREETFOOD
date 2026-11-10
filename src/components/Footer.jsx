import { ReservationButton } from './ReservationProvider.jsx';
import { brandAssets } from '../data/brand.js';
import BrandArt from './BrandArt.jsx';
import Icon from './Icon.jsx';
import { whatsappUrl } from '../utils/whatsapp.js';
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <span className="eyebrow">BUENA COMIDA. MEJOR CREW.</span>
            <p>
              EL PRÓXIMO
              <br />
              ANTOJO ES <span>TUYO.</span> ↗
            </p>
          </div>
          <BrandArt name="maki" />
        </div>
        <div className="footer-grid">
          <a className="footer-logo" href="index.html">
            <img src={brandAssets.logo} alt="Kuro Nikkei Street Food" />
          </a>
          <div>
            <span className="footer-label">HAZ EL PLAN</span>
            <a href="menu.html">Explora la carta</a>
            <ReservationButton className="footer-reserve-link">Reserva tu mesa</ReservationButton>
            <a href="https://kuronakama.com/" target="_blank" rel="noopener noreferrer">
              Nakama club ↗
            </a>
          </div>
          <div>
            <span className="footer-label">CAÉNOS POR AQUÍ</span>
            <p>
              Calle Paz Soldán 202
              <br />
              Yanahuara, Arequipa
            </p>
            <a href="tel:+51949194985">+51 949 194 985</a>
            <a href="mailto:kurosushifusion@gmail.com">kurosushifusion@gmail.com</a>
          </div>
          <div>
            <span className="footer-label">SIGUE A LA CREW</span>
            <div className="social-links">
              <a
                href="https://www.instagram.com/kuro.nikkei.sf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Kuro"
              >
                <Icon name="instagram" />
              </a>
              <a
                href="https://www.facebook.com/kuro.nikkei.sf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Kuro"
              >
                <Icon name="facebook" />
              </a>
              <a
                href={whatsappUrl('¡Hola, Kuro!')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Kuro"
              >
                <Icon name="whatsapp" />
              </a>
            </div>
            <span className="footer-mini">Hecho con actitud en Arequipa.</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© Kuro Nikkei Street Food. Todos los derechos reservados.</span>
          <span>Diseñado y desarrollado por Zebware ↗</span>
        </div>
      </div>
    </footer>
  );
}
