# Product Showcase

A simple product showcase built with **Next.js** (App Router). It lists products from the [FakeStore API](https://fakestoreapi.com/docs), shows the full details of each product, and lets visitors save favorites in their browser.

## Features

- **Home (`/`)**: 5 featured products, each with an image, name, and a **View Details** button
- **Product detail (`/products/[slug]`)**: image, category, rating, price, and full description
- **Navigation**: a menu with Home and Contact, built with `<Link>`; the current page is highlighted
- **Add to Favorite**: a button on the detail page that uses `useState` and `useEffect`; the choice is saved in `localStorage` and survives a refresh
- **Search** (optional): search all products by name or category from the home page
- **Contact (`/contact`)**: a simple demo form (nothing is sent anywhere)
- Responsive layout, light and dark mode, keyboard-friendly and accessible markup
- Friendly 404 page and an error page for when the API is unreachable

## Getting started

You need Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run start` | Serves the production build |
| `npm run lint` | Checks the code with oxlint |

## How it works

- **Data.** `lib/products.js` is the only file that talks to the API. Responses are cached for an hour (`revalidate`).
- **Slugs.** The API only has numeric ids, so a product's slug is `<id>-<title>`, for example `/products/1-fjallraven-foldsack-no-1-backpack-fits-15-laptops`. The page reads the id from the front of the slug.
- **Rendering.** Pages are Server Components, so product data is in the HTML sent to the browser. Product pages are generated at build time with `generateStaticParams`. The home page is rendered on request, because it reads the search text from the URL (`/?q=jacket`).
- **Favorites.** `components/FavoriteButton.jsx` is a Client Component. It reads the saved list in `useEffect` after the page loads (the server cannot see `localStorage`) and keeps the current state in `useState`. The storage key is `product-showcase:favorites`.

## Project structure

```
app/
  layout.js                Header, menu, footer
  page.js                  Home: featured products and search
  products/[slug]/page.js  Product detail
  contact/page.js          Contact page
  not-found.js, error.js   404 and error pages
  globals.css              All styles
components/                NavLinks, ProductCard, FavoriteButton, ContactForm
lib/products.js            API calls, slug helpers, search, price format
```

## Deploy on Vercel

1. Push this project to a GitHub repository.
2. On [vercel.com](https://vercel.com), choose **Add New... > Project** and import the repository.
3. Keep the default settings (Framework Preset: Next.js) and click **Deploy**.

No environment variables are needed.
