import { brandAssets } from '../data/brand.js';

export default function BrandArt({ name, className = '', alt = '', eager = false }) {
  return (
    <span
      className={`brand-art brand-art--${name} ${className}`}
      aria-hidden={alt ? undefined : true}
    >
      <img src={brandAssets[name]} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </span>
  );
}
