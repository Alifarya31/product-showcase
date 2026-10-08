import Link from 'next/link';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, query }) {
  if (products.length === 0) {
    return (
      <div className="notice">
        {query ? (
          <p>
            No products match “{query}”. Try a different word, or{' '}
            <Link href="/" className="text-link">
              show the featured products
            </Link>
            .
          </p>
        ) : (
          <p>There are no products to show right now.</p>
        )}
      </div>
    );
  }

  return (
    <ul className="product-grid">
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} priority={index < 5} />
        </li>
      ))}
    </ul>
  );
}
