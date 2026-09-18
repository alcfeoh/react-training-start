import {describe, expect, it} from 'vitest';
import {cartReducer, CartState} from './cart-hook.solution';
import {LicensePlateData} from '../license-plate-data.type';

/**
 * The payoff of moving the cart to a reducer: the interesting logic is now a
 * pure function. No render, no provider, no act(), no fake server - just
 * "given this state and this action, what comes out".
 */

const GEORGIA = {_id: 'ga', title: '2008 Georgia license plate'} as LicensePlateData;
const JERSEY = {_id: 'nj', title: '2015 New Jersey license plate'} as LicensePlateData;

const READY: CartState = {items: [GEORGIA], confirmed: [GEORGIA], pending: false, error: null};

describe('cartReducer', () => {
	it('shows an added plate before the server confirms it', () => {
		const state = cartReducer(READY, {type: 'added', plate: JERSEY});

		expect(state.items).toEqual([GEORGIA, JERSEY]);
		expect(state.pending).toBe(true);
	});

	it('keeps the confirmed list untouched while a write is in flight', () => {
		const state = cartReducer(READY, {type: 'added', plate: JERSEY});

		expect(state.confirmed).toEqual([GEORGIA]);
	});

	it('rolls back to the confirmed list when the write fails', () => {
		const optimistic = cartReducer(READY, {type: 'added', plate: JERSEY});

		const state = cartReducer(optimistic, {type: 'failed', message: 'Could not add'});

		expect(state.items).toEqual([GEORGIA]);
		expect(state.error).toBe('Could not add');
		expect(state.pending).toBe(false);
	});

	it('removes by id, not by position', () => {
		const two: CartState = {items: [GEORGIA, JERSEY], confirmed: [GEORGIA, JERSEY], pending: false, error: null};

		const state = cartReducer(two, {type: 'removed', plate: GEORGIA});

		expect(state.items).toEqual([JERSEY]);
	});

	it('clears a previous error once the server answers', () => {
		const failed: CartState = {...READY, error: 'Could not add'};

		const state = cartReducer(failed, {type: 'loaded', items: [GEORGIA, JERSEY]});

		expect(state.error).toBeNull();
		expect(state.confirmed).toEqual([GEORGIA, JERSEY]);
	});

	it('never mutates the state it is given', () => {
		const before = READY.items;

		cartReducer(READY, {type: 'added', plate: JERSEY});

		expect(READY.items).toBe(before);
		expect(before).toEqual([GEORGIA]);
	});
});
