import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import axios from 'axios';

import Header from './components/Header';
import Cart from './components/Cart/Cart';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

let productsURL: string = 'https://620623fa92dd6600171c0852.mockapi.io';

export interface IProductsItem {
  id: number | string;
  title: string;
  price: number | string;
  image: string;
};

export interface IAddItem {
  id: number | string;
  title: string;
  price: number | string;
  image: string;
  parentId: number | string;
};

export interface IGlobalContent {
  cartItems: IAddItem[];
  favoritesList: IAddItem[];
  products: IProductsItem[];
  isItemAdded: (id: string | number) => void;
  handleFavoritesList: (obj: IAddItem) => void;
  setCartOpened: any;
  setCartItems: any;
  productsURL: string;
  onAddToCart: (obj: IAddItem) => void;
}

export const AppContext = createContext<IGlobalContent | any>(null);

function App() {

  const [cartOpened, setCartOpened] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductsItem[]>([]);
  const [cartItems, setCartItems] = useState<IAddItem[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [favoritesList, setFavoritesList] = useState<IAddItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, productsResponse] = await Promise.all([
          axios.get<IAddItem[]>(`${productsURL}/cart`),
          axios.get<IAddItem[]>(`${productsURL}/favorites`),
          axios.get<IProductsItem[]>(`${productsURL}/products`)]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavoritesList(favoritesResponse.data);
        setProducts(productsResponse.data);

      } catch (error) {
        alert('Ошибка при запросе данных');
        console.error(error);
      }
    }
    fetchData();
  }, [])

  const onAddToCart = async (obj: IAddItem) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`${productsURL}/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(`${productsURL}/cart`, obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }));
      }
    } catch (error) {
      alert('Не получилось добавить в корзину');
      console.error(error);
    }
  };

  const onRemoveFromCard = (id: string | number) => {
    try {
      axios.delete(`${productsURL}/cart/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Не получилось удалить из корзины');
      console.error(error);
    }
  }

  const handleFavoritesList = async (obj: IAddItem) => {
    try {
      if (favoritesList.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`${productsURL}/favorites/${obj.id}`);
        setFavoritesList(prev => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(`${productsURL}/favorites`, obj);
        setFavoritesList(prev => [...prev, data]);
      }
    }
    catch (error) {
      alert('Не удалось добавить в закладки');
      console.error(error);
    }
  }

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const clearSearchValue = () => {
    setSearchValue('');
  }

  const isItemAdded = (id: string | number) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  const sampleAppContext: IGlobalContent = {
    cartItems, favoritesList, products, isItemAdded, handleFavoritesList, setCartOpened, setCartItems, productsURL, onAddToCart
  };

  return (
    <AppContext.Provider value={sampleAppContext}>
      <div className="wrapper clear">
        <Cart
          onCloseCart={() => setCartOpened(false)}
          onRemoveFromCard={onRemoveFromCard}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route path={process.env.PUBLIC_URL + '/'} element={<Home
            products={products}
            searchValue={searchValue}
            onChangeSearchInput={onChangeSearchInput}
            handleFavoritesList={handleFavoritesList}
            onAddToCart={onAddToCart}
            clearSearchValue={clearSearchValue}
            isLoading={isLoading}
          />} />
          <Route path={process.env.PUBLIC_URL + '/favorites'} element={<Favorites />} />
          <Route path={process.env.PUBLIC_URL + '/orders'} element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;