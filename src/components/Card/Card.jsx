import React, { useState, useContext } from "react";
import css from './Card.module.scss';
import ContentLoader from "react-content-loader"
import { AppContext } from "../../App";

const Card = ({ id,
  onFavoriteClick,
  image,
  title,
  price,
  onPlusClick,
  favorited = false,
  loading = false
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
        {
          loading ?
            <ContentLoader
              speed={2}
              width={155}
              height={250}
              viewBox="0 0 150 265"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="10" ry="10" width="150" height="112" />
              <rect x="0" y="187" rx="10" ry="10" width="100" height="15" />
              <rect x="0" y="167" rx="10" ry="10" width="155" height="15" />
              <rect x="0" y="234" rx="10" ry="10" width="80" height="25" />
              <rect x="117" y="230" rx="10" ry="10" width="32" height="32" />
            </ContentLoader> :
            <>
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
            </>
        }
      </div>
    </div>
  );
}

export default Card;
