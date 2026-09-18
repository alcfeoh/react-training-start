import React from 'react';

export function PlateRow({ plate, currency, onAddToCart }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>
        {plate.title}
        {plate.onSale && <span className="badge badge-success ml-2">On sale</span>}
      </span>
      <span>
        <span className="mr-3">{currency.format(plate.price)}</span>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => onAddToCart(plate)}
        >
          Add to cart
        </button>
      </span>
    </li>
  );
}
