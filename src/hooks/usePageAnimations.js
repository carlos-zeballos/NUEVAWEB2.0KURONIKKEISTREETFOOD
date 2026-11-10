import { useEffect } from 'react';
import { createPageMotion } from '../motion/pageMotion.js';

export function usePageAnimations() {
  useEffect(() => createPageMotion(), []);
}
