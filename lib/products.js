const API_URL = process.env.FAKESTORE_API_URL ?? 'https://fakestoreapi.com';

// Product data rarely changes, so Next.js may reuse a fetched response for an hour.
const REVALIDATE_SECONDS = 3600;

async function request(path) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'ProductShowcase/1.0 (+https://github.com/Alifarya31/product-showcase)',
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`FakeStore API request failed (${response.status}): ${path}`);
  }

  // FakeStore answers 200 with an empty body for ids that do not exist.
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function getProducts(limit) {
  return (await request(`/products?limit=${limit}`)) ?? [];
}

export async function getAllProducts() {
  return (await request('/products')) ?? [];
}

export async function getProduct(id) {
  return request(`/products/${id}`);
}

export function searchProducts(products, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);

  return products.filter((product) => {
    const haystack = `${product.title} ${product.category}`.toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '');
}

// The API only has numeric ids, so the slug is "<id>-<readable-title>",
// for example "1-fjallraven-foldsack-no-1-backpack-fits-15-laptops".
export function productSlug(product) {
  return `${product.id}-${slugify(product.title)}`;
}

export function idFromSlug(slug) {
  const match = /^(\d+)(?:-|$)/.exec(slug);
  return match ? Number(match[1]) : null;
}

const priceFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatPrice(price) {
  return priceFormat.format(price);
}