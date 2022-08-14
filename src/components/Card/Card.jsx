import React, { useState, useContext } from "react";
import css from './Card.module.scss';
import { AppContext } from "../../App";

const Card = ({ id,
  onFavoriteClick,
  image,
  title,
  price,
  onPlusClick,
  favorited = false,
}) => {

  const { isItemAdded } = useContext(AppContext);
  const [addToFavorite, setAddToFavorite] = useState(favorited);

  const itemObject = { id, image, title, price, parentId: id }

  const handleClickPlus = () => {
    onPlusClick(itemObject);
  }

  const hahdleFavoriteClick = () => {
    onFavoriteClick(itemObject);
    setAddToFavorite(!addToFavorite);
  }

  return (
    <div className={css.cardWrap}>
      <div className={css.card}>
        {onFavoriteClick && <div className={css.favorite} onClick={hahdleFavoriteClick}>
          <img src={addToFavorite ? `${process.env.PUBLIC_URL}/` + "img/liked.svg" : `${process.env.PUBLIC_URL}/` + "img/unliked.svg"} alt="like" />
        </div>}
        <img width={133} height={112} src={`${process.env.PUBLIC_URL}/${image}`} alt="Shoes" />
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} грн.</b>
          </div>
          {onPlusClick && <img
            className={css.plus}
            src={isItemAdded(id) ? `${process.env.PUBLIC_URL}/` + "img/btn-checked.svg" : `${process.env.PUBLIC_URL}/` + "img/btn-plus.svg"}
            alt="plus"
            onClick={handleClickPlus} />}
        </div>
      </div>
    </div>
  );
}

export default Card;
