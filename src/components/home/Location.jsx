import Icon from '../Icon.jsx';
const maps = 'https://www.google.com/maps/search/?api=1&query=Kuro+Nikkei+Street+Food+Arequipa';
export default function Location() {
  return (
    <section id="ven-reserva" className="location-section section-space shell">
      <div className="location-photo">
        <img
          src="Assets/local/LOCALKURO.png"
          alt="Interior de Kuro Nikkei Street Food en Calle Paz Soldán 202, Yanahuara"
          loading="lazy"
        />
        <span className="location-photo-tag">TU MESA TE ESPERA EN KURO. ↗</span>
      </div>
      <div className="location-copy">
        <span className="eyebrow">DE YANAHUARA PARA EL MUNDO</span>
        <h2>
          NOS VEMOS
          <br />
          EN <span className="text-orange">KURO.</span>
        </h2>
        <p>
          El hambre ya puso el plan.
          <br />
          Tú solo tienes que llegar.
        </p>
        <div className="location-details">
          <div>
            <Icon name="pin" />
            <p>
              <strong>Calle Paz Soldán 202</strong>
              <span>Yanahuara, Arequipa, Perú</span>
            </p>
          </div>
          <div>
            <Icon name="clock" />
            <p>
              <strong>5:00 p.m. — 10:00 p.m.</strong>
              <span>
                Lunes, martes y de jueves a domingo.
                <br />
                Miércoles de descanso. Feriados: consultar.
              </span>
            </p>
          </div>
        </div>
        <a href={maps} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
          CÓMO LLEGAR <Icon name="arrow" />
        </a>
        <a className="location-phone" href="tel:+51949194985">
          ¿Una consulta? +51 949 194 985
        </a>
      </div>
    </section>
  );
}
