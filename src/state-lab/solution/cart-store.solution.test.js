import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore } from './cart-store.solution';

/**
 * A Zustand store is a plain object outside React: getState() reads it,
 * setState() resets it. No render, no provider, no act().
 * That is the "easy to test" claim on the slide, checked.
 */
describe('cart store', () => {
  const GEORGIA = { _id: 'ga', title: '2008 Georgia license plate' };
  const JERSEY = { _id: 'nj', title: '2015 New Jersey license plate' };

  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it('starts empty', () => {
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('adds a plate', () => {
    useCartStore.getState().addItem(GEORGIA);

    expect(useCartStore.getState().items).toEqual([GEORGIA]);
  });

  it('removes a plate by id, leaving the others', () => {
    useCartStore.getState().addItem(GEORGIA);
    useCartStore.getState().addItem(JERSEY);

    useCartStore.getState().removeItem(GEORGIA._id);

    expect(useCartStore.getState().items).toEqual([JERSEY]);
  });

  it('never mutates the previous array', () => {
    const before = useCartStore.getState().items;

    useCartStore.getState().addItem(GEORGIA);

    expect(useCartStore.getState().items).not.toBe(before);
    expect(before).toEqual([]);
  });
});
