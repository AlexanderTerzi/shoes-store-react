import react, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import { useCart } from "../hooks/useCart";

const Header = (props) => {

  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <NavLink to={process.env.PUBLIC_URL + '/'} >
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.png" alt="Shoes Store" />
          <div>
            <h3 className="text-uppercase">Shoes store</h3>
            <p className="opacity-5">Магазин оригинальных кроссовок</p>
          </div>
        </div>
      </NavLink>
      <ul className="d-flex">
        <li className="mr-30 cu-p d-flex" onClick={props.onClickCart}>
          <img width={18} height={18} src="img/cart.svg" alt="cart" />
          <span>{totalPrice} грн.</span>
        </li>
        <li>
          <NavLink to={process.env.PUBLIC_URL + '/favorites'} >
            <img width={18} height={18} src="img/heart.svg" alt="favorites" />
          </NavLink>
        </li>
        <li>
          <NavLink to={process.env.PUBLIC_URL + '/orders'} >
            <img width={18} height={18} src="img/user.svg" alt="user" />
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
