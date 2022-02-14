import React from 'react';
import Card from '../components/Card/Card';

const Home = ({ searchValue, onChangeSearchInput, clearSearchValue, products, onAddToCart, handleFavoritesList, isLoading }) => {

    const renderProducts = () => {
        const filteredItems = products.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        const fakeArray = [1, 2, 3, 4, 5, 6, 7, 8];
        return (isLoading ? fakeArray : filteredItems).map((item) => (
            <Card
                key={item.id}
                onPlusClick={(obj) => onAddToCart(obj)}
                onFavoriteClick={obj => handleFavoritesList(obj)}
                loading={isLoading}
                {...item} />
        ))
    }
    return (
        <>
            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                    <div className="search-block d-flex">
                        <img src="img/search.svg" alt="Search" />
                        <input onChange={onChangeSearchInput} placeholder="Поиск..." value={searchValue} />
                        {searchValue && <img className='cu-p clear' src="img/btn-remove.svg" alt="Clear" onClick={clearSearchValue} />}
                    </div>
                </div>
                <div className="d-flex flex-wrap justify-around">
                    {renderProducts()}
                </div>
            </div>
        </>
    );
};

export default Home;