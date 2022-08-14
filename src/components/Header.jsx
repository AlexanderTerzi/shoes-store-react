import React from "react";
import { Link } from 'react-router-dom';
import { useCart } from "../hooks/useCart";

const Header = (props) => {

  const { totalPrice } = useCart();

  return (
    <header className="header d-flex justify-between align-center p-40">
      <Link to={process.env.PUBLIC_URL + '/'} >
        <div className="d-flex align-center">
          <img width={40} height={40} src={`${process.env.PUBLIC_URL}/` + "img/logo.png"} alt="Shoes Store" />
          <div>
            <h3 className="text-uppercase">Shoes store</h3>
            <p className="opacity-5">Магазин оригинальных кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex nav">
        <li className="mr-30 cu-p d-flex" onClick={props.onClickCart}>
          <img width={18} height={18} src={`${process.env.PUBLIC_URL}/` + "img/cart.svg"} alt="cart" />
          <span>{totalPrice} грн.</span>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + '/favorites'} >
            <img width={18} height={18} src={`${process.env.PUBLIC_URL}/` + "img/heart.svg"} alt="favorites" />
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + '/orders'} >
            <img width={18} height={18} src={`${process.env.PUBLIC_URL}/` + "img/user.svg"} alt="user" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
