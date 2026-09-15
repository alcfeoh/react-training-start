import React from 'react';
import { LICENSE_PLATES } from '../../mock-data';
import { useCartStore } from './cart-store.solution';

export function StoreView() {
  // One selector, one value. `addItem` never changes identity, so this
  // component does not re-render when the cart contents change.
  const addItem = useCartStore((state) => state.addItem);

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
