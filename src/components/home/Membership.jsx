import BrandArt from '../BrandArt.jsx';
import Icon from '../Icon.jsx';
export default function Membership() {
  return (
    <section id="socio-kuro" className="membership section-space">
      <div className="shell membership-card">
        <div className="membership-copy">
          <span className="eyebrow">BIENVENIDO AL NAKAMA CLUB</span>
          <h2>
            LA FIDELIDAD
            <br />
            TIENE{' '}
            <span>
              BUEN
              <br className="desktop-break" /> SABOR.
            </span>
          </h2>
          <p>
            Si Kuro ya es tu lugar, esto es para ti. Súmate al club y convierte tus antojos en
            recompensas.
          </p>
          <a
            href="https://kuronakama.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-yellow"
          >
            QUIERO SER NAKAMA <Icon name="arrow" />
          </a>
          <small>Tu próxima buena decisión empieza con un maki.</small>
        </div>
        <div className="membership-art">
          <span className="membership-ring" />
          <BrandArt name="kuma" alt="Kuma disfrutando su maki" />
          <span className="membership-sticker">
            AQUÍ
            <br />
            PREMIAMOS
            <br />A LOS FIELES <span>↗</span>
          </span>
        </div>
      </div>
    </section>
  );
}
