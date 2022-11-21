import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { AppContext, IAddItem, IProductsItem } from '../App';

import Card from '../components/Card/Card';
import Skeletons from '../components/Skeletons/Skeletons';

const Orders = () => {
    const { productsURL } = useContext(AppContext);
    const [orders, setOrders] = useState<IAddItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get<IProductsItem[]>(`${productsURL}/orders`);
                setOrders(data.reduce((prev: IAddItem[], obj: any) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе заказов');
                console.error(error);
            }
        })();
    }, []);

    const skeletons = [...new Array(8)].map((_, index) => <Skeletons key={index} />);

    return (
        <>
            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>Мои Заказы</h1>
                </div>

                <div className="d-flex flex-wrap justify-around">
                    {isLoading ? skeletons : orders.map((item, index) => (
                        <Card
                            favorited={false}
                            onFavoriteClick={undefined}
                            onPlusClick={undefined}
                            key={index}
                            {...item} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Orders;