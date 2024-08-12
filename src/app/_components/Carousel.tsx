import {Children} from 'react';
import {Splide, SplideTrack, SplideSlide} from '@splidejs/react-splide';
import {IconChevronLeft, IconChevronRight} from '@/_components/icons';
import styles from '@/_styles/carousel.module.scss';
import '@splidejs/react-splide/css/core';


const Carousel = (({children, height, loop = true}) => {
    // Splide carousel configuration options
    const slides = Children.toArray(children);

    const splideOptions = {
        type: "loop", // Infinite carousel
        perPage: 1, // Number of items visible per page
        perMove: 1, // Move one item at a time
        rewind: true, // Rewind to start when the end is reached
        pagination: false, // Hide pagination dots
    };

    return (
        <div className={`carousel ${styles.container}`}>
            <Splide hasTrack={ false } options={splideOptions}>
                <SplideTrack>{slides.map((slide, i) => <SplideSlide key={`slide-${i}`}>{slide}</SplideSlide>)}</SplideTrack>
                <div className="splide__arrows">
                    <span className={`splide__arrow splide__arrow--prev ${styles.arrows} ${styles.prev}`}><IconChevronLeft /></span>
                    <span className={`splide__arrow splide__arrow--next ${styles.arrows} ${styles.next}`}><IconChevronRight /></span>
                </div>
            </Splide>
        </div>
    )
});

export default Carousel;