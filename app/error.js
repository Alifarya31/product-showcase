'use client';

import Link from 'next/link';

export default function Error({ reset }) {
  return (
    <div className="notice notice-center" role="alert">
      <h1>Something went wrong</h1>
      <p>We could not load the product data. Please try again in a moment.</p>
      <div className="actions">
        <button type="button" className="button" onClick={() => reset()}>
          Try again
        </button>
        <Link href="/" className="button button-outline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
