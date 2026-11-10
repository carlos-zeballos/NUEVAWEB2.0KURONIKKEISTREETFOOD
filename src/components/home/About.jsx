import { ReservationButton } from '../ReservationProvider.jsx';
import BrandArt from '../BrandArt.jsx';
import Icon from '../Icon.jsx';
export default function About() {
  return (
    <section id="nosotros" className="crew-section">
      <div className="shell crew-grid">
        <div className="crew-art">
          <span className="crew-orbit" />
          <BrandArt name="crew" alt="Kuma y Ukuku compartiendo makis" />
          <span className="crew-note">
            TU CREW.
            <br />
            NUESTRA MESA.
          </span>
        </div>
        <div className="crew-copy">
          <span className="eyebrow">EL PLAN ESTÁ EN NUESTRO LOCAL.</span>
          <h2>
            ¡LA MESA
            <br />
            ESTÁ SERVIDA!
            <br />
            <span className="crew-title-japanese">ITADAKIMASU!!!</span>
          </h2>
          <p>
            Makis al centro, buena vibra y una mesa para compartir. El mejor plan con tu crew
            empieza en nuestro local.
          </p>
          <p>
            Ven con tus amigos, arma una cita o celebra ese “porque sí”. Tú pones la compañía; Kuma
            y Ukuku ponen el sabor.
          </p>
          <ReservationButton className="btn btn-ink">
            RESERVA TU MESA <Icon name="arrow" />
          </ReservationButton>
        </div>
      </div>
    </section>
  );
}
