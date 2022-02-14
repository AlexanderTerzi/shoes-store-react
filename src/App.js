import { createContext, useEffect, useState } from 'react';
import Header from './components/Header';
import Cart from './components/Cart/Cart';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

let productsURL = 'https://620623fa92dd6600171c0852.mockapi.io';

export const AppContext = createContext({});

function App() {

  const [cartOpened, setCartOpened] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favoritesList, setFavoritesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, productsResponse] = await Promise.all([
          axios.get(`${productsURL}/cart`),
          axios.get(`${productsURL}/favorites`),
          axios.get(`${productsURL}/products`)]);

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

  const onAddToCart = async (obj) => {
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

  const onRemoveFromCard = (id) => {
    try {
      axios.delete(`${productsURL}/cart/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Не получилось удалить из корзины');
      console.error(error);
    }
  }

  const handleFavoritesList = async (obj) => {
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

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  const clearSearchValue = () => {
    setSearchValue('');
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{ cartItems, favoritesList, products, isItemAdded, handleFavoritesList, setCartOpened, setCartItems, productsURL, onAddToCart }}>
      <div className="wrapper clear">
        <Cart
          cartItems={cartItems}
          onCloseCart={() => setCartOpened(false)}
          onRemoveFromCard={onRemoveFromCard}
          opened={cartOpened} />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route exact path='/' element={<Home
            products={products}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            handleFavoritesList={handleFavoritesList}
            onAddToCart={onAddToCart}
            clearSearchValue={clearSearchValue}
            cartItems={cartItems}
            isLoading={isLoading}
          />} />
          <Route exact path='/favorites' element={<Favorites />} />
          <Route exact path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
