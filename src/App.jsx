import { useState, useEffect, useMemo } from 'react';
import ProductCard from './components/ProductCard';
import CartPanel from './components/CartPanel';
import { CATEGORIES, CATEGORY_ICONS, PRODUCTS_URL } from './utils/helpers';
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]); // [{ id, qty }]
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch(PRODUCTS_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(
    () => (category === 'All' ? products : products.filter((p) => p.group === category)),
    [products, category]
  );

  const cartQtyMap = useMemo(() => {
    const m = {};
    cart.forEach(({ id, qty }) => { m[id] = qty; });
    return m;
  }, [cart]);

  const totalCartItems = cart.reduce((s, e) => s + e.qty, 0);

  function handleAdd(product) {
    setCart((prev) => {
      const existing = prev.find((e) => e.id === product.id);
      if (existing) {
        return prev.map((e) => (e.id === product.id ? { ...e, qty: e.qty + 1 } : e));
      }
      return [...prev, { id: product.id, qty: 1 }];
    });
  }

  function handleQtyChange(id, qty) {
    if (qty <= 0) {
      setCart((prev) => prev.filter((e) => e.id !== id));
    } else {
      setCart((prev) => prev.map((e) => (e.id === id ? { ...e, qty } : e)));
    }
  }

  function handleRemove(id) {
    setCart((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">♻️</div>
            <div>
              <div className="logo-name">ReNew Tech</div>
              <div className="logo-sub">Refurbished Computers</div>
            </div>
          </div>
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            🛒 Cart
            {totalCartItems > 0 && (
              <span className="cart-badge">{totalCartItems}</span>
            )}
          </button>
        </div>
      </header>

      <main className="main">
        <div className="filters-bar">
          <span className="filters-label">Category:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-chip${category === cat ? ' active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat === 'All' ? 'All Products' : `${CATEGORY_ICONS[cat]} ${cat}s`}
            </button>
          ))}
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            Loading products…
          </div>
        )}

        {error && (
          <div className="error-state">Failed to load products: {error}</div>
        )}

        {!loading && !error && (
          <>
            <h2 className="section-heading">
              {category === 'All' ? 'All Products' : `${category}s`}
              <span style={{ fontWeight: 400, color: 'var(--muted)', fontSize: '16px', marginLeft: '10px' }}>
                ({filtered.length} items)
              </span>
            </h2>
            <div className="products-grid">
              {filtered.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🔍</div>
                  <p>No products found in this category.</p>
                </div>
              ) : (
                filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    cartQty={cartQtyMap[p.id] || 0}
                    onAdd={handleAdd}
                    onQtyChange={handleQtyChange}
                  />
                ))
              )}
            </div>
          </>
        )}
      </main>

      {cartOpen && (
        <CartPanel
          cart={cart}
          products={products}
          onClose={() => setCartOpen(false)}
          onQtyChange={handleQtyChange}
          onRemove={handleRemove}
        />
      )}
    </>
  );
}
