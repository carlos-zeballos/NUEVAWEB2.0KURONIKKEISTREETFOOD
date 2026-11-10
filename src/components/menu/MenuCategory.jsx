import DishCard from './DishCard.jsx';
export default function MenuCategory({ category, dishes, visibleIds, index }) {
  const items = dishes.filter((dish) => dish.categoryId === category.id);
  const categoryVisible = items.some((dish) => visibleIds.has(dish.id));
  const renderDish = (dish) => (
    <DishCard key={dish.id} dish={dish} hidden={!visibleIds.has(dish.id)} />
  );
  return (
    <section
      id={category.id}
      className={`menu-category-section ${categoryVisible ? '' : 'oculto'}`}
      hidden={!categoryVisible}
    >
      <div className="category-heading">
        <div>
          <span className="category-number">0{index + 1}</span>
          <h2>{category.title}</h2>
        </div>
        {category.description && <p>{category.description}</p>}
        <span className="category-total">
          {items.filter((dish) => visibleIds.has(dish.id)).length} opciones ↗
        </span>
      </div>
      {category.groups ? (
        category.groups.map((group) => {
          const groupItems = items.filter((dish) => dish.groupId === group.id);
          return (
            groupItems.some((dish) => visibleIds.has(dish.id)) && (
              <div className="menu-subgroup" key={group.id}>
                <h3>{group.title}</h3>
                <div className="dish-grid">{groupItems.map(renderDish)}</div>
              </div>
            )
          );
        })
      ) : (
        <div className="dish-grid">{items.map(renderDish)}</div>
      )}
    </section>
  );
}
