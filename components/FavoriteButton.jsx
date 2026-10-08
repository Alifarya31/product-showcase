'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'product-showcase:favorites';

function readFavorites() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter(Number.isInteger) : [];
  } catch {
    return [];
  }
}

function writeFavorites(ids) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage can be blocked (private mode). The button still works for this visit.
  }
}

export default function FavoriteButton({ productId, productTitle }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState('');

  // The server cannot see localStorage, so the saved choice is read after the page loads.
  useEffect(() => {
    function syncFromStorage() {
      setIsFavorite(readFavorites().includes(productId));
    }

    syncFromStorage();
    window.addEventListener('storage', syncFromStorage);
    return () => window.removeEventListener('storage', syncFromStorage);
  }, [productId]);

  function handleClick() {
    const saved = readFavorites().filter((id) => id !== productId);
    const nextIsFavorite = !isFavorite;

    writeFavorites(nextIsFavorite ? [...saved, productId] : saved);
    setIsFavorite(nextIsFavorite);
    setMessage(
      nextIsFavorite
        ? `Added "${productTitle}" to your favorites.`
        : `Removed "${productTitle}" from your favorites.`,
    );
  }

  return (
    <div className="favorite">
      <button
        type="button"
        className={`button button-favorite${isFavorite ? ' is-active' : ''}`}
        onClick={handleClick}
      >
        <svg
          className="heart"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          aria-hidden="true"
        >
          <path
            d="M12 21s-7.5-4.6-9.6-9.1C.9 8.7 2.6 5 6.1 5c2 0 3.3 1.1 4 2.2.3.5 1.5.5 1.8 0C12.6 6.1 13.9 5 15.9 5c3.5 0 5.2 3.7 3.7 6.9C19.5 16.4 12 21 12 21z"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        {isFavorite ? 'Remove from Favorite' : 'Add to Favorite'}
      </button>

      <p className="favorite-status" role="status">
        {message}
      </p>
    </div>
  );
}
