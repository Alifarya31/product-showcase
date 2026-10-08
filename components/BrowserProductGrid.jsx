'use client';

import { useEffect, useState } from 'react';
import { fetchAllProducts, fetchProducts } from '../lib/browser-api';
import { searchProducts } from '../lib/products';
import ProductGrid from './ProductGrid';

export default function BrowserProductGrid({ query, limit }) {
  const [state, setState] = useState({ status: 'loading', products: [] });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const products = query
          ? searchProducts(await fetchAllProducts(), query)
          : await fetchProducts(limit);
        if (!cancelled) setState({ status: 'ready', products });
      } catch (error) {
        console.error('Could not load products in the browser:', error);
        if (!cancelled) setState({ status: 'error', products: [] });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [query, limit]);

  if (state.status === 'loading') {
    return (
      <div className="notice" role="status">
        <p>Loading products...</p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="notice" role="alert">
        <p>
          We could not load the products right now. Please refresh the page in a
          moment.
        </p>
      </div>
    );
  }

  return <ProductGrid products={state.products} query={query} />;
}
