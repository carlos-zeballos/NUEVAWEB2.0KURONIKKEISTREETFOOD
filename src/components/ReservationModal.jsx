import { useEffect, useRef, useState } from 'react';
import { dateError, localDate, reservationMessage } from '../utils/reservation.js';
import { openWhatsApp } from '../utils/whatsapp.js';
import BrandArt from './BrandArt.jsx';
import Icon from './Icon.jsx';

export default function ReservationModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const [minimumDate, setMinimumDate] = useState('');
  useEffect(() => {
    setMinimumDate(localDate());
  }, []);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  const validateDate = (event) =>
    event.currentTarget.setCustomValidity(dateError(event.currentTarget.value));
  const submit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    form.elements.fecha.setCustomValidity(dateError(data.fecha));
    if (form.reportValidity()) openWhatsApp(reservationMessage(data));
  };
  return (
    <dialog
      id="reserva"
      ref={dialogRef}
      className="reservation-dialog"
      aria-labelledby="reservation-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        className="reservation-close"
        type="button"
        aria-label="Cerrar reserva"
        onClick={onClose}
      >
        <Icon name="close" />
      </button>
      <div className="reservation-modal-scroll">
        <div className="reservation-modal-grid">
          <aside className="reservation-modal-art">
            <span className="eyebrow">LOS BUENOS PLANES SE RESERVAN</span>
            <h2 id="reservation-title">
              RESERVA
              <br />
              TU MESA.
            </h2>
            <p>
              Trae a tu crew.
              <br />
              Nosotros ponemos los makis.
            </p>
            <BrandArt name="ukuku" alt="Ukuku listo para recibir a tu crew" />
            <span className="reservation-modal-caption">¡LA MESA ESTÁ SERVIDA!</span>
          </aside>
          <form className="reservation-form" onSubmit={submit}>
            <div className="form-heading">
              <h3>¿ARMAMOS EL PLAN?</h3>
              <span>↗</span>
            </div>
            <p>Completa tus datos y confirma por WhatsApp.</p>
            <div className="form-fields">
              <label className="field-wide" htmlFor="nombre">
                Tu nombre
                <input
                  id="nombre"
                  name="nombre"
                  autoComplete="name"
                  placeholder="¿Cómo te llamas, nakama?"
                  required
                />
              </label>
              <label className="field-wide" htmlFor="telefono">
                Tu WhatsApp
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  autoComplete="tel"
                  placeholder="Tu número de contacto"
                  required
                />
              </label>
              <label htmlFor="fecha">
                ¿Qué día?
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  min={minimumDate}
                  onChange={validateDate}
                  required
                />
              </label>
              <label htmlFor="hora">
                ¿A qué hora?
                <input type="time" id="hora" name="hora" min="17:00" max="22:00" required />
              </label>
              <label className="field-wide" htmlFor="personas">
                ¿Cuántos vienen?
                <input
                  type="number"
                  id="personas"
                  name="personas"
                  min="1"
                  placeholder="Número de personas"
                  required
                />
              </label>
            </div>
            <div className="reservation-note">
              <Icon name="check" />
              <p>
                Tu reserva se confirma con un <strong>pago de S/ 20.00</strong> y el envío del
                comprobante por WhatsApp.
              </p>
            </div>
            <button className="btn btn-ink" type="submit">
              Reservar por WhatsApp <Icon name="whatsapp" />
            </button>
            <small>De 5:00 p.m. a 10:00 p.m. · Los miércoles descansamos.</small>
          </form>
        </div>
      </div>
    </dialog>
  );
}
