import Link from 'next/link';
import NavLinks from '../components/NavLinks';
import './globals.css';

export const metadata = {
  title: {
    default: 'Product Showcase',
    template: '%s | Product Showcase',
  },
  description:
    'A simple product showcase built with Next.js. Browse products, open their details, and save your favorites.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>

        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand">
              <span className="brand-mark" aria-hidden="true">
                P
              </span>
              Product Showcase
            </Link>
            <NavLinks />
          </div>
        </header>

        <main id="main" className="container main">
          {children}
        </main>

        <footer className="site-footer">
          <div className="container">
            Product data from{' '}
            <a href="https://fakestoreapi.com" target="_blank" rel="noreferrer">
              FakeStore API
            </a>
            . Built with Next.js.
          </div>
        </footer>
      </body>
    </html>
  );
}
