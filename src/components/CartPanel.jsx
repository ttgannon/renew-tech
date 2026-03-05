import { fmt } from '../utils/helpers';

export default function CartPanel({ cart, products, onClose, onQtyChange, onRemove }) {
  const cartEntries = cart
    .map(({ id, qty }) => {
      const p = products.find((pr) => pr.id === id);
      return p ? { ...p, qty } : null;
    })
    .filter(Boolean);

  const subtotal = cartEntries.reduce((sum, e) => sum + e.price * e.qty, 0);
  const totalItems = cart.reduce((s, e) => s + e.qty, 0);

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="cart-panel">
        <div className="cart-header">
          <div>
            <div className="cart-title">Shopping Cart</div>
            <div className="cart-count">
              {totalItems} item{totalItems !== 1 ? 's' : ''}
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {cartEntries.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="cart-items">
            {cartEntries.map((entry) => (
              <div className="cart-item" key={entry.id}>
                <div>
                  <div className="ci-name">{entry.name}</div>
                  <div className="ci-cat">{entry.group}</div>
                </div>
                <div>
                  <div className="ci-price">{fmt(entry.price * entry.qty)}</div>
                  <div className="ci-unit">{fmt(entry.price)} each</div>
                </div>
                <div className="ci-controls">
                  <div className="ci-qty">
                    <button
                      className="ci-qty-btn"
                      onClick={() => onQtyChange(entry.id, entry.qty - 1)}
                    >−</button>
                    <span className="ci-qty-num">{entry.qty}</span>
                    <button
                      className="ci-qty-btn"
                      onClick={() => onQtyChange(entry.id, entry.qty + 1)}
                    >+</button>
                  </div>
                  <button className="ci-remove" onClick={() => onRemove(entry.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-footer">
          <div className="summary-rows">
            <div className="summary-row">
              <span>Items ({totalItems})</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: 'var(--success)' }}>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{fmt(subtotal)}</span>
            </div>
          </div>
          <button
            className="checkout-btn"
            disabled={cartEntries.length === 0}
            onClick={() => alert('Checkout is not implemented in this demo.')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
