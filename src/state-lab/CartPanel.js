import React from 'react';
import { useCartStore } from './cart-store';

/**
 * The cart. No props: it reads what it needs straight from the store.
 *
 * TODO 5 - read `items` and `removeItem` with selectors, in two calls.
 * One selector per value is the idiomatic form, and it is what keeps the
 * re-renders narrow.
 */
export function CartPanel() {
  const items = []; // TODO 5
  const removeItem = () => {}; // TODO 5

  if (items.length === 0) {
    return (
      <div className="col-md-4">
        <h2>My cart</h2>
        <div className="alert alert-info" role="alert">
          Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-4">
      <h2>My cart</h2>
      <ul className="list-group">
        {items.map((plate, index) => (
          <li
            key={`${plate._id}-${index}`}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{plate.title}</span>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => removeItem(plate._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
