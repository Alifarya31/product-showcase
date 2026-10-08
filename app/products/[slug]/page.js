import { notFound } from 'next/navigation';
import BrowserProductDetail from '../../../components/BrowserProductDetail';
import ProductDetail from '../../../components/ProductDetail';
import {
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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const id = idFromSlug(slug);

  try {
    const product = id === null ? null : await getProduct(id);
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
  const id = idFromSlug(slug);

  if (id === null) notFound();

  let product;
  try {
    product = await getProduct(id);
  } catch (error) {
    // The server could not reach the API, so let the browser try instead.
    console.error('Could not load the product on the server:', error);
    return <BrowserProductDetail id={id} />;
  }

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
