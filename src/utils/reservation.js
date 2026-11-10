export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function dateError(value, today = localDate()) {
  if (!value) return '';
  if (value < today) return 'No puedes reservar para fechas pasadas';
  if (new Date(`${value}T00:00:00`).getDay() === 3) return 'Los miércoles descansamos';
  return '';
}

export function reservationMessage({ nombre, telefono, fecha, hora, personas }) {
  return `Hola, quiero reservar en Kuro Nikkei Street Food 🍣

📋 *Datos de la reserva:*
Nombre: ${nombre}
Teléfono: ${telefono}
Fecha: ${fecha}
Hora: ${hora}
Personas: ${personas}

💳 *Entiendo que debo realizar un pago de S/ 20.00 soles y enviar el comprobante por este medio para confirmar mi reserva.*

¡Gracias!`;
}
