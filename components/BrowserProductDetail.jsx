'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchProduct } from '../lib/browser-api';
import ProductDetail from './ProductDetail';

export default function BrowserProductDetail({ id }) {
  const [state, setState] = useState({ status: 'loading', product: null });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const product = await fetchProduct(id);
        if (cancelled) return;

        if (!product) {
          setState({ status: 'missing', product: null });
          return;
        }

        document.title = `${product.title} | Product Showcase`;
        setState({ status: 'ready', product });
      } catch (error) {
        console.error('Could not load the product in the browser:', error);
        if (!cancelled) setState({ status: 'error', product: null });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (state.status === 'ready') {
    return <ProductDetail product={state.product} />;
  }

  if (state.status === 'loading') {
    return (
      <div className="notice" role="status">
        <p>Loading product...</p>
      </div>
    );
  }

  const isMissing = state.status === 'missing';

  return (
    <div className="notice notice-center" role={isMissing ? undefined : 'alert'}>
      <h1>{isMissing ? 'We could not find that product' : 'Something went wrong'}</h1>
      <p>
        {isMissing
          ? 'The product you are looking for does not exist.'
          : 'We could not load the product data. Please try again in a moment.'}
      </p>
      <Link href="/" className="button">
        Back to Home
      </Link>
    </div>
  );
}
