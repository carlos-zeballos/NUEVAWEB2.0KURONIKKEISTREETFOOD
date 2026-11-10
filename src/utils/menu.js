export function normalizeText(value = '') {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function filterDishes(dishes, query, flavors) {
  const term = normalizeText(query.trim());
  return dishes.filter(
    (dish) =>
      normalizeText(dish.search || dish.name).includes(term) &&
      (flavors.length === 0 || flavors.some((flavor) => dish.flavors.includes(flavor))),
  );
}
