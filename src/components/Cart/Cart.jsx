import react, { useContext, useState } from "react";
import { AppContext } from "../../App";
import Info from "../Info";
import axios from "axios";
import { useCart } from "../../hooks/useCart";
import css from './Cart.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Cart = ({ onCloseCart, onRemoveFromCard, products = [], opened }) => {

  const { cartItems, setCartItems, totalPrice } = useCart();
  const { productsURL } = useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${productsURL}/orders`, {
        items: cartItems,
      });
      setOrderId(data.id)
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`${productsURL}/cart/${item.id}`);
        await delay(1000);
      }

    } catch (error) {

    }
    setIsLoading(false);
  }

  return (
    <div className={`${css.overlay} ${opened ? css.overlayVisible : ''}`}>
      <div className={css.cart}>
        <h2 className="d-flex justify-between mb-30">
          Корзина <img className="cu-p" src="img/btn-remove.svg" alt="close" onClick={onCloseCart} />
        </h2>

        {
          cartItems.length > 0 ?
            <div className="d-flex flex-column flex">
              <div className={css.items}>
                {
                  cartItems.map(item => (
                    <div className="cartItem d-flex align-center mb-20" key={item.id}>
                      <div
                        style={{ backgroundImage: `url(${item.image})` }}
                        className="cartItemImg"></div>
                      <div className="mr-20 flex">
                        <p className="mb-5">{item.title}</p>
                        <b>{item.price} грн.</b>
                      </div>
                      <img onClick={() => onRemoveFromCard(item.id)} className="removeBtn" src="img/btn-remove.svg" alt="Remove" />
                    </div>
                  ))
                }
              </div>
              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} грн. </b>
                  </li>
                  <li>
                    <span>Налог 7%:</span>
                    <div></div>
                    <b>{(totalPrice * 0.07).toFixed(0)} грн. </b>
                  </li>
                </ul>
                <button disabled={isLoading} onClick={onClickOrder} className="mainButton">
                  Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div> :
            <Info
              title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
              description={isOrderComplete ? `Скоро ваш заказ #${orderId} будет передан в службу доставки` : "Добавьте товар"}
              image={isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"} />

        }


      </div>
    </div>
  );
}

export default Cart;
