export const CATEGORIES = ['All', 'Laptop', 'Tablet', 'Mobile', 'Accessory'];

export const CATEGORY_ICONS = {
  Laptop: '💻',
  Tablet: '📱',
  Mobile: '📲',
  Accessory: '🔌',
};

export const PRODUCTS_URL =
  'https://s3.us-east-1.amazonaws.com/assets.spotandtango/products.json';

export function fmt(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(n);
}

export function savingsPct(msrp, price) {
  return Math.round((1 - price / msrp) * 100);
}
