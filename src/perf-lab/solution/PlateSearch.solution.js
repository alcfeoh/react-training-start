import React, { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { PLATES } from '../plates';
import { PlateRow } from './PlateRow.solution';

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

  // 1. The input stays urgent, the list is allowed to lag behind.
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  // 2. The expensive work only runs when the deferred query changes,
  //    not on every keystroke and not when the cart changes.
  const results = useMemo(() => search(PLATES, deferredQuery), [deferredQuery]);

  // 3. Stable identities, so memo() on PlateRow can actually do its job.
  const currency = useMemo(
    () => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
    []
  );
  const addToCart = useCallback(
    (plate) => setCart((current) => [...current, plate]),
    []
  );

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

      <ul className="list-group" style={{ opacity: isStale ? 0.6 : 1 }}>
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
