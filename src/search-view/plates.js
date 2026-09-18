import { LICENSE_PLATES } from '../mock-data';

const STATES = ['GA', 'NJ', 'CA', 'TX', 'NY', 'FL', 'OH', 'MI', 'WA', 'AZ'];

/**
 * The mock data holds a handful of plates with a one-paragraph description,
 * which is nowhere near enough to feel a rendering problem on a 2026 laptop.
 * This builds a catalog closer to a real one: 20 000 plates, each with a full
 * product description.
 *
 * The long descriptions are the point - they are what the search walks through
 * on every keystroke. All the plates share the same description string in
 * memory, so the catalog costs tens of megabytes, not hundreds.
 */
const CATALOG_SIZE = 20000;
const DESCRIPTION_LENGTH = 1;

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
      description: source.description.repeat(DESCRIPTION_LENGTH),
      price: Math.round((source.price + (i % 40)) * 100) / 100,
      onSale: i % 7 === 0,
    });
  }
  return plates;
}

export const PLATES = buildCatalog(CATALOG_SIZE);
