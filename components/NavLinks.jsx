'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/contact', label: 'Contact' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="nav-list">
        {links.map((link) => {
          const isCurrent = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link"
                aria-current={isCurrent ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
