import { fmt, savingsPct, CATEGORY_ICONS } from '../utils/helpers';

export default function ProductCard({ product, cartQty, onAdd, onQtyChange }) {
  const soldOut = product.status !== 'Available';
  const pct = savingsPct(product.msrp, product.price);
  const icon = CATEGORY_ICONS[product.group] || '🖥️';

  return (
    <div className={`product-card${soldOut ? ' sold-out' : ''}`}>
      {soldOut && <span className="sold-out-badge">Sold Out</span>}

      <span className={`category-chip cat-${product.group}`}>
        {icon} {product.group}
      </span>

      <p className="product-name">{product.name}</p>

      <div className="pricing">
        <span className="sale-price">{fmt(product.price)}</span>
        <span className="msrp">{fmt(product.msrp)}</span>
        {pct > 0 && <span className="savings-badge">-{pct}%</span>}
      </div>

      {cartQty > 0 ? (
        <div className="in-cart-indicator">
          <button className="qty-btn" onClick={() => onQtyChange(product.id, cartQty - 1)}>−</button>
          <span className="qty-display">{cartQty}</span>
          <button className="qty-btn" onClick={() => onQtyChange(product.id, cartQty + 1)}>+</button>
          <span className="qty-label">in cart</span>
        </div>
      ) : (
        <button
          className="add-btn"
          disabled={soldOut}
          onClick={() => onAdd(product)}
        >
          {soldOut ? 'Unavailable' : 'Add to Cart'}
        </button>
      )}
    </div>
  );
}
