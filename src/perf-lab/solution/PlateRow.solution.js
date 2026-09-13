import React, { memo } from 'react';

/**
 * memo() alone is not enough: it only helps if the props keep the same
 * identity from one render to the next. See the useMemo / useCallback
 * calls in PlateSearch.solution.js.
 */
export const PlateRow = memo(function PlateRow({ plate, currency, onAddToCart }) {
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
});
