import React, { useState } from 'react';
import { PLATES } from './plates';
import { PlateRow } from './PlateRow';

/**
 * Accent- and case-insensitive normalisation.
 * Correct, but not cheap: Unicode normalisation allocates a new string
 * and walks it twice.
 */
function normalize(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

function search(plates, query) {
  const needle = normalize(query);
  if (!needle) {
    return plates;
  }
  return plates.filter(
    (plate) =>
      normalize(plate.title).includes(needle) ||
      normalize(plate.state).includes(needle) ||
      normalize(plate.description).includes(needle)
  );
}

export function PlateSearch() {
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);

  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const results = search(PLATES, query);

  const addToCart = (plate) => setCart((current) => [...current, plate]);

  return (
    <div className="container mt-4">
      <h1>License plate search</h1>

      <input
        className="form-control mb-3"
        placeholder="Search 4000 plates..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <p className="text-muted">
        {results.length} plates found - {cart.length} in the cart
      </p>

      <ul className="list-group">
        {results.slice(0, 100).map((plate) => (
          <PlateRow
            key={plate._id}
            plate={plate}
            currency={currency}
            onAddToCart={addToCart}
          />
        ))}
      </ul>
    </div>
  );
}
