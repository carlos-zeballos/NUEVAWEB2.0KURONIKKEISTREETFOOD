export function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  const headerHeight = document.getElementById('main-header')?.offsetHeight ?? 0;
  window.scrollTo({
    top: section.getBoundingClientRect().top + window.scrollY - headerHeight - 20,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  });
}
