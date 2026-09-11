import { LICENSE_PLATES } from '../mock-data';

const STATES = ['GA', 'NJ', 'CA', 'TX', 'NY', 'FL', 'OH', 'MI', 'WA', 'AZ'];

/**
 * The mock data only holds a handful of plates, which is not enough to feel
 * a rendering problem. This builds a realistic catalog out of it.
 */
function buildCatalog(size) {
  const plates = [];
  for (let i = 0; i < size; i++) {
    const source = LICENSE_PLATES[i % LICENSE_PLATES.length];
    const state = STATES[i % STATES.length];
    const year = 1960 + (i % 60);
    plates.push({
      ...source,
      _id: `${source._id}-${i}`,
      state,
      year,
      title: `${year} ${state} license plate #${i}`,
      price: Math.round((source.price + (i % 40)) * 100) / 100,
      onSale: i % 7 === 0,
    });
  }
  return plates;
}

export const PLATES = buildCatalog(4000);
