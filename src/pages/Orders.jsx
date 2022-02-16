import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card/Card';
import axios from 'axios';

const Orders = () => {
    const { productsURL } = useContext(AppContext);
    const [orders, setOrders] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${productsURL}/orders`);
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе заказов');
                console.error(error);
            }
        })();
    }, []);

    const fakeArray = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <>
            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>Мои Заказы</h1>
                </div>

                <div className="d-flex flex-wrap justify-around">
                    {(isLoading ? fakeArray : orders).map((item, index) => (
                        <Card
                            key={index}
                            loading={isLoading}
                            {...item}
                        />
                    )
                    )}
                </div>
            </div>
        </>
    );
};

export default Orders;