import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

const Info = ({ title, description, image }) => {

    const { setCartOpened } = useContext(AppContext);

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px" src={image} alt="Empty" />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <Link to={process.env.PUBLIC_URL + '/'} onClick={() => setCartOpened(false)} className="mainButton">
                <img src="img/arrow.svg" alt="Arrow" />
                Вернуться назад
            </Link>
        </div>
    );
};

export default Info;