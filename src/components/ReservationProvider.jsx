import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ReservationModal from './ReservationModal.jsx';

const ReservationContext = createContext(null);

export function useReservation() {
  const value = useContext(ReservationContext);
  if (!value) throw new Error('Reservation controls must be inside ReservationProvider');
  return value;
}

export function ReservationButton({ children, onClick, ...props }) {
  const { openReservation } = useReservation();
  return (
    <button
      {...props}
      type="button"
      aria-haspopup="dialog"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) openReservation();
      }}
    >
      {children}
    </button>
  );
}

export default function ReservationProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openReservation = useCallback(() => setOpen(true), []);
  const closeReservation = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openReservation }), [openReservation]);
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#reserva') openReservation();
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [openReservation]);
  return (
    <ReservationContext.Provider value={value}>
      {children}
      <ReservationModal open={open} onClose={closeReservation} />
    </ReservationContext.Provider>
  );
}
