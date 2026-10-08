import Link from 'next/link';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <div className="notice notice-center">
      <p className="big-number" aria-hidden="true">
        404
      </p>
      <h1>We could not find that page</h1>
      <p>The product or page you are looking for does not exist.</p>
      <Link href="/" className="button">
        Back to Home
      </Link>
    </div>
  );
}
