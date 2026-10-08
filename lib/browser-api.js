// Used only when the server could not reach the FakeStore API (some hosts are
// blocked from cloud servers but work fine from a visitor's own browser).
const API_URL = 'https://fakestoreapi.com';

async function get(path) {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`FakeStore API request failed (${response.status}): ${path}`);
  }

  // FakeStore answers 200 with an empty body for ids that do not exist.
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function fetchProducts(limit) {
  return (await get(`/products?limit=${limit}`)) ?? [];
}

export async function fetchAllProducts() {
  return (await get('/products')) ?? [];
}

export async function fetchProduct(id) {
  return get(`/products/${id}`);
}
