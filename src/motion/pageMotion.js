// Individual transform properties keep the artwork's CSS tilts and hover effects intact.
const easeOut = 'cubic-bezier(.25, .1, .25, 1)';
const settle = 'cubic-bezier(.25, .45, .3, 1)';
const reveal = (translate = '0 24px', scale = 0.98, rotate = '0deg', opacity = 0.78) => [
  { opacity, translate, scale, rotate },
  { opacity: 1, translate: '0 0', scale: 1, rotate: '0deg' },
];

export const motionPresets = {
  brand: { frames: reveal('0 -6px', 1, '0deg', 0.9), duration: 850 },
  copy: { frames: reveal('0 18px', 1, '0deg', 1), duration: 1300 },
  headline: { frames: reveal('0 24px', 1, '-.3deg', 1), duration: 1400 },
  frame: { frames: reveal('34px 18px', 0.96, '-2deg'), duration: 1550 },
  // Opacity belongs to the carousel's crossfade, never to this entrance.
  posterPhoto: { frames: [{ scale: 0.97 }, { scale: 1 }], duration: 1700 },
  heroPhoto: { frames: [{ scale: 1.065 }, { scale: 1 }], duration: 1900 },
  price: { frames: reveal('0 9px', 0.96, '-3deg'), duration: 1200, easing: settle },
  seal: { frames: reveal('8px -16px', 0.94, '8deg'), duration: 1400, easing: settle },
  paper: { frames: reveal('22px -8px', 0.96, '-5deg'), duration: 1350, easing: settle },
  surprise: {
    frames: [
      { opacity: 0.8, translate: '-12px 24px', scale: 0.93, rotate: '-5deg' },
      { opacity: 1, translate: '0 -3px', scale: 1.012, rotate: '.4deg', offset: 0.8 },
      { opacity: 1, translate: '0 0', scale: 1, rotate: '0deg' },
    ],
    duration: 1650,
  },
  kuma: { frames: reveal('35px 20px', 0.92, '6deg'), duration: 1700, easing: settle },
  ukuku: { frames: reveal('-20px 22px', 0.94, '-5deg'), duration: 1500, easing: settle },
  crew: { frames: reveal('0 34px', 0.93, '-3deg'), duration: 1700 },
  maki: { frames: reveal('-8px 6px', 0.94, '-22deg'), duration: 1200, easing: settle },
  halo: {
    frames: [
      { opacity: 0.65, scale: 0.9 },
      { opacity: 1, scale: 1 },
    ],
    duration: 1750,
  },
  card: { frames: reveal('0 22px', 0.99, '0deg', 1), duration: 1250 },
  food: {
    frames: [
      { opacity: 0.85, scale: 1.035 },
      { opacity: 1, scale: 1 },
    ],
    duration: 1300,
  },
  menuPhoto: {
    frames: [
      { opacity: 0.9, translate: '0 6px', scale: 1.02 },
      { opacity: 1, translate: '0 0', scale: 1 },
    ],
    duration: 1150,
  },
  editorial: { frames: reveal('0 20px', 0.99, '-.6deg', 1), duration: 1500 },
  place: { frames: reveal('0 22px', 1.025), duration: 1700 },
  table: { frames: reveal('0 30px', 0.96, '-1.5deg'), duration: 1700 },
  contact: { frames: reveal('0 18px', 0.95), duration: 1000 },
  dialog: { frames: reveal('0 12px', 0.99, '0deg', 0.9), duration: 420 },
  detail: { frames: [{ opacity: 0.85 }, { opacity: 1 }], duration: 650 },
  ink: { frames: [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], duration: 1400 },
};

const inRow = (element, selector) => {
  const item = element.closest(selector);
  if (!item?.parentElement) return 0;
  const siblings = [...item.parentElement.children].filter(
    (child) => child.matches(selector) && !child.hidden,
  );
  return Math.max(0, siblings.indexOf(item)) % 3;
};

// Choreography is tied to the role of each asset, not its file name.
const rules = [
  { selector: '.brand-logo img, .footer-logo img', preset: 'brand' },
  { selector: '.hero-copy > .eyebrow', preset: 'copy', replay: false },
  {
    selector: '.hero-headline-line',
    preset: 'headline',
    delay: (el) => [...el.parentElement.children].indexOf(el) * 140,
  },
  { selector: '.hero-headline-line path', preset: 'ink', delay: 340 },
  { selector: '.hero-promo-price', preset: 'price', delay: 120 },
  { selector: '.hero-copy > .promo-description', preset: 'copy', delay: 160 },
  { selector: '.hero-photo-frame', preset: 'frame', delay: 40, replay: false },
  {
    selector: '.hero-photo.active',
    preset: (el) => (el.style.objectFit === 'contain' ? 'posterPhoto' : 'heroPhoto'),
    delay: 90,
  },
  { selector: '.sun-sticker', preset: 'seal', delay: 280 },
  { selector: '.hero-mascot', preset: 'surprise', delay: 280 },
  { selector: '.photo-caption', preset: 'paper', delay: 320 },
  {
    selector:
      '.membership-copy, .crew-copy, .location-copy, .menu-hero > div:first-child, .menu-end > div, .section-heading, .kitchen-posts-heading, .category-heading',
    preset: 'copy',
  },
  { selector: '.membership-ring, .crew-orbit', preset: 'halo' },
  { selector: '.membership-art > .brand-art', preset: 'kuma', delay: 110 },
  {
    selector:
      '.membership-sticker, .crew-note, .menu-hero-sticker, .location-photo-tag, .paper-note',
    preset: 'paper',
    delay: 260,
  },
  { selector: '.crew-art > .brand-art', preset: 'crew', delay: 90 },
  { selector: '.menu-hero-art > .brand-art', preset: 'ukuku', delay: 140 },
  { selector: '.favorite-card', preset: 'card', delay: (el) => inRow(el, '.favorite-card') * 90 },
  {
    selector: '.favorite-photo > img',
    preset: 'food',
    delay: (el) => inRow(el, '.favorite-card') * 90 + 50,
  },
  {
    selector: '.card-sticker',
    preset: 'paper',
    delay: (el) => inRow(el, '.favorite-card') * 90 + 190,
  },
  {
    selector: '.kitchen-post',
    preset: 'editorial',
    delay: (el) => inRow(el, '.kitchen-post') * 100,
  },
  { selector: '.location-photo > img', preset: 'place' },
  {
    selector: '.dish-photo-button > img',
    preset: 'menuPhoto',
    delay: (el) => inRow(el, '.dish-card') * 65,
  },
  { selector: '.menu-end-illustration', preset: 'table' },
  { selector: '.reservation-dialog, .menu-photo-dialog', preset: 'dialog' },
  { selector: '.reservation-modal-art > .brand-art', preset: 'ukuku', delay: 80 },
  { selector: '.reservation-modal-caption', preset: 'paper', delay: 170 },
  { selector: '.menu-photo-content > img', preset: 'detail' },
  { selector: '.whatsapp-float', preset: 'contact', delay: 650 },
  { selector: '.brand-art--crew', preset: 'crew' },
  { selector: '.brand-art--kuma', preset: 'kuma', skip: (el) => !!el.closest('.whatsapp-float') },
  { selector: '.brand-art--ukuku', preset: 'ukuku' },
  { selector: '.brand-art--surprise', preset: 'surprise' },
  { selector: '.brand-art--maki', preset: 'maki', delay: 90 },
];

export function createPageMotion(root = document) {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return () => {};
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const entries = new Map();
  const resets = new Set();
  let observer;
  let frame;
  let disposed = false;

  const stop = (entry) => {
    entry.animation?.cancel();
    entry.animation = null;
    entry.removeLoadListeners?.();
    entry.removeLoadListeners = null;
  };
  const canShow = (element) => {
    const box = element.getBoundingClientRect();
    return (
      box.width > 0 &&
      box.height > 0 &&
      box.bottom > 0 &&
      box.top < innerHeight &&
      !element.closest('[hidden]')
    );
  };
  const play = (entry) => {
    const { element, rule } = entry;
    if (
      disposed ||
      preference.matches ||
      entry.seen ||
      !element.isConnected ||
      !element.matches(rule.selector) ||
      !canShow(element)
    )
      return;
    const image =
      element instanceof HTMLImageElement
        ? element
        : element.matches('.brand-art')
          ? element.querySelector('img')
          : null;
    if (image && !image.complete) {
      if (!entry.removeLoadListeners) {
        const ready = () => {
          entry.removeLoadListeners?.();
          entry.removeLoadListeners = null;
          play(entry);
        };
        const failed = () => {
          entry.removeLoadListeners?.();
          entry.removeLoadListeners = null;
          observer?.unobserve(element);
        };
        image.addEventListener('load', ready, { once: true });
        image.addEventListener('error', failed, { once: true });
        entry.removeLoadListeners = () => {
          image.removeEventListener('load', ready);
          image.removeEventListener('error', failed);
        };
      }
      return;
    }
    if (image && !image.naturalWidth) return;
    entry.seen = true;
    observer?.unobserve(element);
    const preset =
      motionPresets[typeof rule.preset === 'function' ? rule.preset(element) : rule.preset];
    const delay = typeof rule.delay === 'function' ? rule.delay(element) : rule.delay || 0;
    const animation = element.animate(preset.frames, {
      duration: preset.duration,
      delay,
      easing: preset.easing || easeOut,
      fill: 'both',
    });
    entry.animation = animation;
    element.dataset.motionState = 'entering';
    animation.finished
      .then(() => {
        if (entry.animation !== animation) return;
        // Release animation styles so carousel opacity and CSS hover transforms remain in control.
        animation.cancel();
        entry.animation = null;
        element.dataset.motionState = 'entered';
      })
      .catch(() => {});
  };
  const scan = () => {
    if (disposed) return;
    for (const [element, entry] of entries) {
      if (!element.isConnected) {
        stop(entry);
        observer?.unobserve(element);
        entries.delete(element);
      } else if (
        [...resets].some((container) => container === element || container.contains(element))
      ) {
        // A new promo must not hide/replay its photo frame or permanent label.
        if (entry.rule.replay === false) continue;
        // Filtering should only introduce newly shown cards, not flash cards that stayed visible.
        if (
          entry.seen &&
          element.closest('#menu-results') &&
          element.getClientRects().length &&
          !element.closest('[hidden]')
        )
          continue;
        stop(entry);
        observer?.unobserve(element);
        entry.seen = false;
      }
    }
    resets.clear();
    const assigned = new Set();
    for (const rule of rules) {
      for (const element of root.querySelectorAll(rule.selector)) {
        if (assigned.has(element) || rule.skip?.(element)) continue;
        assigned.add(element);
        let entry = entries.get(element);
        if (!entry) {
          entry = { element, rule, seen: false };
          entries.set(element, entry);
        }
        entry.rule = rule;
        if (preference.matches) {
          stop(entry);
          element.dataset.motionState = 'reduced';
          continue;
        }
        if (!entry.seen && !entry.animation) observer?.observe(element);
      }
    }
    // Future imagery still gets a quiet entrance unless its parent is already animated.
    for (const element of root.querySelectorAll('img')) {
      if (
        assigned.has(element) ||
        element.closest('.brand-art, .whatsapp-float, .hero-photo-frame, .kitchen-post')
      )
        continue;
      let entry = entries.get(element);
      if (!entry) {
        entry = { element, rule: { selector: 'img', preset: 'food' }, seen: false };
        entries.set(element, entry);
      }
      if (preference.matches) {
        stop(entry);
        element.dataset.motionState = 'reduced';
      } else if (!entry.seen && !entry.animation) observer?.observe(element);
    }
    for (const entry of entries.values()) {
      if (!entry.element.matches(entry.rule.selector)) {
        stop(entry);
        observer?.unobserve(entry.element);
        entry.seen = false;
      }
    }
  };
  const schedule = () => {
    if (frame || disposed) return;
    frame = requestAnimationFrame(() => {
      frame = null;
      scan();
    });
  };
  const applyPreference = () => {
    observer?.disconnect();
    for (const entry of entries.values()) stop(entry);
    document.documentElement.dataset.pageMotion = preference.matches ? 'reduced' : 'ready';
    if (!preference.matches) {
      observer = new IntersectionObserver(
        (records) => {
          for (const record of records)
            if (record.isIntersecting) {
              const entry = entries.get(record.target);
              if (entry) play(entry);
            }
        },
        { threshold: 0.1, rootMargin: '0px 0px -18px 0px' },
      );
    }
    scan();
  };
  const mutations = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === 'attributes') resets.add(record.target);
    }
    schedule();
  });
  applyPreference();
  mutations.observe(root === document ? document.body : root, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['hidden', 'open', 'data-motion-key'],
  });
  preference.addEventListener('change', applyPreference);
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    mutations.disconnect();
    observer?.disconnect();
    preference.removeEventListener('change', applyPreference);
    for (const entry of entries.values()) stop(entry);
    entries.clear();
    delete document.documentElement.dataset.pageMotion;
  };
}
