import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import css from './Carousel.module.scss'
import CarouselItem from './CarouselItem/CarouselItem';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "#fff",
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translateY(-100%)',
                right: '-6px',
                color: '#000',
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "#fff",
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translateY(-100%)',
                left: '-6px',
                color: '#000',
                zIndex: '5',
            }}
            onClick={onClick}
        />
    );
}

const Carousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <Slider {...settings}>
            <CarouselItem>
                <img src={`${process.env.PUBLIC_URL}/` + "img/carousel/carousel-2.png"} className={css.carouselImage} alt="Nike" />
                <img src={`${process.env.PUBLIC_URL}/` + "img/carousel/brand.png"} className={css.carouselBrand} alt="Adidas/Disney" />
                <div className={css.carouselOffer}>
                    <div className={css.carouselOfferText}>
                        <span className={css.redText}>Air Jordan</span>,<br></br>Forever!
                    </div>
                    <button className={`${css.carouselButton} ${css.redButton}`}>
                        Купить
                    </button>
                </div>
            </CarouselItem>
            <CarouselItem>
                <img src={`${process.env.PUBLIC_URL}/` + "img/carousel/carousel-1.png"} className={css.carouselImage} alt="Adidas" />
                <img src={`${process.env.PUBLIC_URL}/` + "img/carousel/brand.png"} className={css.carouselBrand} alt="Adidas/Disney" />
                <div className={css.carouselOffer}>
                    <div className={css.carouselOfferText}>
                        <span className={css.greenText}>Stan Smith</span>,<br></br>Forever!
                    </div>
                    <button className={`${css.carouselButton} ${css.greenButton}`}>
                        Купить
                    </button>
                </div>
            </CarouselItem>
        </Slider>

    );
};

export default Carousel;