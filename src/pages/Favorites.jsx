import React, { useContext } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card/Card';

const Favorites = () => {

    const { favoritesList, handleFavoritesList } = React.useContext(AppContext);

    return (
        <>
            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>Мои закладки</h1>
                </div>

                <div className="d-flex flex-wrap justify-around">
                    {favoritesList.map(item => (
                        <Card
                            id={item.id}
                            image={item.image}
                            title={item.title}
                            price={item.price}
                            key={item.id}
                            favorited={true}
                            onFavoriteClick={handleFavoritesList} />
                    )
                    )}
                </div>
            </div>
        </>
    );
};

export default Favorites;