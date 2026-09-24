import React from 'react';
import {render, screen} from '@testing-library/react';
import {LicensePlate} from './LicensePlate';
import {LICENSE_PLATES} from '../mock-data';

const plate = LICENSE_PLATES[0]; // 2008 Georgia license plate, $8.55

describe('LicensePlate', () => {

    it('renders the plate title', () => {
        render(<LicensePlate plate={plate} buttonText="Add to cart" currency="USD"/>);

        expect(screen.getByRole('heading', {name: '2008 Georgia license plate'})).toBeInTheDocument();
    });

    it('renders the price formatted in the given currency', () => {
        const {rerender} = render(<LicensePlate plate={plate} buttonText="Add to cart" currency="USD"/>);
        expect(screen.getByRole('heading', {name: '$8.55'})).toBeInTheDocument();

        rerender(<LicensePlate plate={plate} buttonText="Add to cart" currency="EUR"/>);
        expect(screen.getByRole('heading', {name: '€8.55'})).toBeInTheDocument();
    });

    it('renders the button text passed as a prop', () => {
        render(<LicensePlate plate={plate} buttonText="Remove from cart" currency="USD"/>);

        expect(screen.getByRole('button')).toHaveTextContent('Remove from cart');
    });
});
