import React from 'react';
import { LICENSE_PLATES } from '../mock-data';
import { useCartStore } from './cart-store';

/**
 * The catalog. It only needs ONE thing from the store: the addItem action.
 *
 * TODO 4 - read `addItem` from the store with a selector, and call it from
 * the button. Actions never change identity, so a component that only reads
 * an action never re-renders when the cart changes. Check that in the
 * Profiler once it works.
 */
export function StoreView() {
  const addItem = () => {}; // TODO 4

  return (
    <div className="col-md-8">
      <h2>License plates</h2>
      <ul className="list-group">
        {LICENSE_PLATES.map((plate) => (
          <li
            key={plate._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{plate.title}</span>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => addItem(plate)}
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
