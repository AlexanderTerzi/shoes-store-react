import React from 'react';

import css from '../Carousel.module.scss'

const CarouselItem = ({ children }) => {
    return (
        <div className={css.carousel}>
            <div className={css.carouselItem}>
                {children}
            </div>
        </div>
    );
};

export default CarouselItem;