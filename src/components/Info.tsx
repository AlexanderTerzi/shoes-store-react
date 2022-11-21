import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AppContext } from '../App';

interface IInfoProps {
    title: string;
    description: string;
    image: string;
}

const Info: React.FC<IInfoProps> = ({ title, description, image }) => {

    const { setCartOpened } = useContext(AppContext);

    const location = useLocation();

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px" src={image} alt="Empty" />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <Link to={location.pathname.includes('favorites') ? `${process.env.PUBLIC_URL}/` : location} onClick={() => setCartOpened(false)} className="mainButton">
                <img src={`${process.env.PUBLIC_URL}/` + "img/arrow.svg"} alt="Arrow" />
                Вернуться назад
            </Link>
        </div>
    );
};

export default Info;