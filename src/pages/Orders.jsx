import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card/Card';
import Skeletons from '../components/Skeletons/Skeletons';
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
                            key={index}
                            {...item}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Orders;