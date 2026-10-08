import Form from "next/form";
import Link from "next/link";
import BrowserProductGrid from "../components/BrowserProductGrid";
import ProductGrid from "../components/ProductGrid";
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
    // The server could not reach the API, so the browser will try instead.
    console.error("Could not load products on the server:", error);
    loadFailed = true;
  }

  let heading = "Featured products";
  if (query && loadFailed) {
    heading = `Results for “${query}”`;
  } else if (query) {
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

        {loadFailed ? (
          <BrowserProductGrid
            key={query}
            query={query}
            limit={HOME_PRODUCT_COUNT}
          />
        ) : (
          <ProductGrid products={products} query={query} />
        )}
      </section>
    </>
  );
}
