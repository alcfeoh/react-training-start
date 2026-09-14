import React from 'react';
import { StoreView } from './StoreView';
import { CartPanel } from './CartPanel';

/**
 * Render this from App.tsx to run the lab:
 *
 *   import { StateLab } from './state-lab/StateLab';
 *   export function App() { return <StateLab />; }
 *
 * Nothing is fetched, so no backend server is needed.
 */
export function StateLab() {
  return (
    <div className="container mt-4">
      <h1>Lab SM1 - the cart, with Zustand</h1>
      <div className="row">
        <StoreView />
        <CartPanel />
      </div>
    </div>
  );
}
