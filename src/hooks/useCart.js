import react, { useContext } from "react"
import { AppContext } from "../App"

export const useCart = () => {
    const { cartItems, setCartItems } = useContext(AppContext);

    const totalPrice = (cartItems.reduce((sum, items) => items.price + sum, 0));

    return { cartItems, setCartItems, totalPrice };
};