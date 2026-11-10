import { ReservationButton } from './ReservationProvider.jsx';
import { useEffect, useRef, useState } from 'react';
import { brandAssets } from '../data/brand.js';
import Icon from './Icon.jsx';
import { whatsappUrl } from '../utils/whatsapp.js';

export default function Header({ home = false }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const menuButton = useRef(null);
  const prefix = home ? '' : 'index.html';
  const links = [
    { label: 'La carta', href: 'menu.html', active: !home },
    { label: 'La crew', href: `${prefix}#nosotros` },
    { label: 'Encuéntranos', href: `${prefix}#ven-reserva` },
    { label: 'Nakama club', href: '#socio-kuro' },
  ];
  useEffect(() => {
    const outside = (event) => {
      if (!headerRef.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);
  return (
    <>
      <div className="announcement">
        <span>JAPÓN + PERÚ + MUCHA ACTITUD</span>
        <a href={`${prefix}#ven-reserva`}>
          YANAHUARA, AREQUIPA <Icon name="pin" />
        </a>
      </div>
      <header id="main-header" className="site-header" ref={headerRef}>
        <div className="shell nav-shell">
          <a
            href={home ? '#inicio' : 'index.html'}
            className="brand-logo"
            aria-label="Kuro Nikkei Street Food — Inicio"
          >
            <img src={brandAssets.logo} alt="Kuro Nikkei Street Food" />
          </a>
          <nav id="navbar-menu" className="desktop-nav" aria-label="Navegación principal">
            {links.map((link) => (
              <a key={link.label} href={link.href} aria-current={link.active ? 'page' : undefined}>
                {link.label}
              </a>
            ))}
          </nav>
          <a
            className="btn btn-ink nav-order"
            href={whatsappUrl('¡Hola, nakama! Quiero hacer un pedido.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pide por WhatsApp <Icon name="whatsapp" />
          </a>
          <button
            ref={menuButton}
            id="menu-btn"
            className="menu-toggle"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
        <nav id="mobile-menu" className="mobile-nav" hidden={!open} aria-label="Navegación móvil">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
              <Icon name="arrow" />
            </a>
          ))}
          <ReservationButton onClick={() => setOpen(false)}>
            Reserva tu mesa
            <Icon name="arrow" />
          </ReservationButton>
        </nav>
      </header>
    </>
  );
}
