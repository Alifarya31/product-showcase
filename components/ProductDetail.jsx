import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '../lib/products';
import FavoriteButton from './FavoriteButton';

export default function ProductDetail({ product }) {
  const { rate, count } = product.rating ?? {};

  return (
    <article className="detail">
      <Link href="/" className="text-link back-link">
        <span aria-hidden="true">←</span> Back to products
      </Link>

      <div className="detail-grid">
        <div className="detail-media">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 860px) 480px, 90vw"
            priority
          />
        </div>

        <div className="detail-info">
          <p className="pill">{product.category}</p>
          <h1>{product.title}</h1>

          {rate !== undefined && (
            <p className="rating">
              <span aria-hidden="true">★</span> {rate.toFixed(1)}{' '}
              <span className="muted">({count} reviews)</span>
              <span className="sr-only">
                Rated {rate.toFixed(1)} out of 5 from {count} reviews
              </span>
            </p>
          )}

          <p className="detail-price">{formatPrice(product.price)}</p>

          <h2 className="detail-subheading">Description</h2>
          <p className="detail-description">{product.description}</p>

          <FavoriteButton productId={product.id} productTitle={product.title} />
        </div>
      </div>
    </article>
  );
}
