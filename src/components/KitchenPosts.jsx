import { editorialPosts } from '../data/editorialPosts.js';
import Icon from './Icon.jsx';

export default function KitchenPosts({ excludeIds = [] }) {
  return (
    <aside className="kitchen-posts" aria-label="Destacados de nuestra cocina">
      <div className="kitchen-posts-heading">
        <div>
          <span className="eyebrow">DEL FEED A TU MESA</span>
          <h3>
            MAKIS MARCA KURO,
            <br />
            <span className="text-orange">¡GRÍTALO, AREQUIPA!</span>
          </h3>
        </div>
        <span className="paper-note">Directo de nuestra cocina ↗</span>
      </div>
      <div
        className="kitchen-posts-grid"
        style={{
          gridTemplateColumns: `repeat(${editorialPosts.filter((post) => !excludeIds.includes(post.id)).length}, minmax(0, 1fr))`,
        }}
      >
        {editorialPosts
          .filter((post) => !excludeIds.includes(post.id))
          .map((post) => (
            <a className="kitchen-post" href={`menu.html#${post.id}`} key={post.id}>
              <img src={post.image} alt={post.alt} loading="lazy" decoding="async" />
              <div className="kitchen-post-caption">
                <div>
                  <span className="eyebrow">{post.category}</span>
                  <h4>{post.name}</h4>
                </div>
                <span className="kitchen-post-arrow" aria-hidden="true">
                  <Icon name="arrow" />
                </span>
              </div>
            </a>
          ))}
      </div>
    </aside>
  );
}
