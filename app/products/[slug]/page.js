import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FavoriteButton from '../../../components/FavoriteButton';
import {
  formatPrice,
  getAllProducts,
  getProduct,
  idFromSlug,
  productSlug,
} from '../../../lib/products';

// Pre-build a page for every product. Slugs that were not pre-built are still
// rendered on the first request.
export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((product) => ({ slug: productSlug(product) }));
  } catch {
    return [];
  }
}

async function loadProduct(slug) {
  const id = idFromSlug(slug);
  return id === null ? null : getProduct(id);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const product = await loadProduct(slug);
    if (!product) return { title: 'Product not found' };

    return {
      title: product.title,
      description: product.description.slice(0, 160),
    };
  } catch {
    return { title: 'Product' };
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await loadProduct(slug);

  if (!product) notFound();

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
