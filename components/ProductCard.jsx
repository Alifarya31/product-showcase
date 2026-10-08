import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, productSlug } from '../lib/products';

export default function ProductCard({ product, priority = false }) {
  return (
    <article className="card">
      <div className="card-media">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1100px) 200px, (min-width: 640px) 33vw, 90vw"
          priority={priority}
        />
      </div>

      <div className="card-body">
        <p className="card-category">{product.category}</p>
        <h2 className="card-title">{product.title}</h2>
        <p className="card-price">{formatPrice(product.price)}</p>

        <Link href={`/products/${productSlug(product)}`} className="button">
          View Details
          <span className="sr-only"> of {product.title}</span>
        </Link>
      </div>
    </article>
  );
}
