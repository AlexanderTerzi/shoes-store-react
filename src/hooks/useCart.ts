import { useContext } from "react"
import { IAddItem, AppContext } from './../App';

export const useCart = () => {
    const { cartItems, setCartItems } = useContext(AppContext);

    const totalPrice = (cartItems.reduce((sum: number, items: IAddItem) => Number(items.price) + sum, 0));

    return { cartItems, setCartItems, totalPrice };
};