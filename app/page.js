import Form from "next/form";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { getAllProducts, getProducts, searchProducts } from "../lib/products";

const HOME_PRODUCT_COUNT = 5;

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const query = (typeof params.q === "string" ? params.q : "").trim();

  let products = [];
  let loadFailed = false;

  try {
    products = query
      ? searchProducts(await getAllProducts(), query)
      : await getProducts(HOME_PRODUCT_COUNT);
  } catch (error) {
    console.error("Could not load products:", error);
    loadFailed = true;
  }

  let heading = "Featured products";
  if (query) {
    heading = `${products.length} ${products.length === 1 ? "result" : "results"} for “${query}”`;
  }

  return (
    <>
      <section className="hero" aria-labelledby="page-title">
        <h1 id="page-title">Product Showcase</h1>
        <p>
          Browse a small catalog, open a product to see everything about it, and
          save the ones you like.
        </p>

        <Form action="/" className="search" key={query}>
          <label htmlFor="search" className="search-label">
            Search products
          </label>
          <div className="search-row">
            <input
              id="search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="e.g. jacket, backpack"
              autoComplete="off"
            />
            <button type="submit" className="button">
              Search
            </button>
          </div>
        </Form>
      </section>

      <section aria-labelledby="list-heading">
        <div className="section-head">
          <h2 id="list-heading">{heading}</h2>
          {query && (
            <Link href="/" className="text-link">
              Clear search
            </Link>
          )}
        </div>

        {loadFailed && (
          <div className="notice" role="alert">
            <p>
              We could not load the products right now. Please refresh the page
              in a moment.
            </p>
          </div>
        )}

        {!loadFailed && products.length === 0 && (
          <div className="notice">
            <p>
              No products match “{query}”. Try a different word, or{" "}
              <Link href="/" className="text-link">
                show the featured products
              </Link>
              .
            </p>
          </div>
        )}

        {products.length > 0 && (
          <ul className="product-grid">
            {products.map((product, index) => (
              <li key={product.id}>
                <ProductCard product={product} priority={index < 5} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
