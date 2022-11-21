import React from 'react';

import { IAddItem, IProductsItem } from '../App';

import Card from '../components/Card/Card';
import Carousel from '../components/Carousel/Carousel';
import Skeletons from '../components/Skeletons/Skeletons';

interface IHomeProps {
    searchValue: string;
    onChangeSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearSearchValue: () => void;
    products: IProductsItem[];
    onAddToCart: (obj: IAddItem) => void;
    handleFavoritesList: (obj: IAddItem) => void;
    isLoading: boolean;
}

const Home: React.FC<IHomeProps> = ({ searchValue, onChangeSearchInput, clearSearchValue, products, onAddToCart, handleFavoritesList, isLoading }) => {

    const filteredItems = products.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    const skeletons = [...new Array(8)].map((_, index) => <Skeletons key={index} />);

    const sneakers = filteredItems.map((item) => (
        <Card
            favorited={false}
            key={item.id}
            onPlusClick={(obj: IAddItem) => onAddToCart(obj)}
            onFavoriteClick={(obj: IAddItem) => handleFavoritesList(obj)}
            {...item} />
    ))

    return (
        <>
            <div className="content p-40">
                <div className="content__top d-flex align-center justify-between mb-40">
                    <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                    <div className="search-block d-flex">
                        <img src={`${process.env.PUBLIC_URL}/` + "img/search.svg"} alt="Search" />
                        <input onChange={onChangeSearchInput} placeholder="Поиск..." value={searchValue} />
                        {searchValue && <img className='cu-p clear' src={`${process.env.PUBLIC_URL}/` + "img/btn-remove.svg"} alt="Clear" onClick={clearSearchValue} />}
                    </div>
                </div>
                <Carousel />
                <div className="products">
                    {isLoading ? skeletons : sneakers}
                </div>
            </div>
        </>
    );
};

export default Home;