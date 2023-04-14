import {useEffect, useState} from "react";
import {addToCart, getCartContents, removeFromCart} from "./cart-service";


export function useCart() {
	const [cartContents, setCartContents] = useState([]);

	useEffect(() => {
		refreshCart();
	}, []);

	const refreshCart = () => getCartContents().then(data => setCartContents(data));

	const addPlateToCart = async (plate) => {
		await addToCart(plate);
		return refreshCart();
	};

	const removePlateFromCart = async (plate) => {
		await removeFromCart(plate);
		return refreshCart();
	};

    return [cartContents, addPlateToCart, removePlateFromCart];
}


