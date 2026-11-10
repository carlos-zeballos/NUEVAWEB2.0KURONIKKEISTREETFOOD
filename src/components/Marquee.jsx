import { Fragment } from 'react';
import BrandArt from './BrandArt.jsx';

const phrases = [
  'NIKKEI CON ACTITUD',
  '¿SUSHI? ¡KURO!',
  'COMPARTE LA FUSIÓN',
  'EL MEJOR SUSHI DE AREQUIPA',
  'SUSHI DE CALIDAD',
];
export default function Marquee({ orange = false }) {
  const sequence = phrases.map((phrase) => (
    <Fragment key={phrase}>
      <span className="marquee-phrase">{phrase}</span>
      <BrandArt name="maki" className="marquee-maki" />
    </Fragment>
  ));
  return (
    <div className={`marquee ${orange ? 'marquee--orange' : ''}`}>
      <div className="marquee-track">
        <span>{sequence}</span>
        <span aria-hidden="true">{sequence}</span>
      </div>
    </div>
  );
}
