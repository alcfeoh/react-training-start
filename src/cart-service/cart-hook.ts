import {useEffect, useState} from "react";
import {addToCart, getCartContents, removeFromCart} from "./cart-service";
import {LicensePlateData} from '../license-plate-data.type';

export type CartFeatures = [LicensePlateData[], (plate: LicensePlateData) => Promise<LicensePlateData[]>,(plate: LicensePlateData) => Promise<LicensePlateData[]>];


export function useCart(): CartFeatures {
	const [cartContents, setCartContents] = useState<LicensePlateData[]>([]);

	useEffect(() => {
		refreshCart();
	}, []);

	const refreshCart = async () => {
		const data = await getCartContents();
		setCartContents(data);
		return data;
	};

	const addPlateToCart = async (plate: LicensePlateData) => {
		await addToCart(plate);
		return refreshCart();
	};

	const removePlateFromCart = async (plate: LicensePlateData) => {
		await removeFromCart(plate);
		return refreshCart();
	};

    return [cartContents, addPlateToCart, removePlateFromCart];
}


