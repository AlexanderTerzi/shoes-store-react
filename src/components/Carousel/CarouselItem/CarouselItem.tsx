import React from 'react';

import css from '../Carousel.module.scss'

interface ICarouselItemProps {
    children: React.ReactNode;
}

const CarouselItem: React.FC<ICarouselItemProps> = ({ children }) => {
    return (
        <div className={css.carousel}>
            <div className={css.carouselItem}>
                {children}
            </div>
        </div>
    );
};

export default CarouselItem;