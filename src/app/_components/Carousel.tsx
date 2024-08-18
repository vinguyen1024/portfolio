import React, { Children } from 'react';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import { IconChevronLeft, IconChevronRight } from '@/_components/icons';
import styles from '@/_styles/carousel.module.scss';
import '@splidejs/react-splide/css/core';

interface Props {
  children: React.ReactNode
}

const Carousel: React.FC<Props> = (({ children }) => {
    // Splide carousel configuration options
    const slides = Children.toArray(children);

    const splideOptions = {
        type: "loop", // Infinite carousel
        perPage: 1, // Number of items visible per page
        perMove: 1, // Move one item at a time
        rewind: slides.length > 1 ? true : false, // Determines whether to start when the end is reached
        arrows: slides.length > 1 ? true : false, // Determines whether to create/find arrows
        drag: slides.length > 1 ? true : false, // Determines whether to allow to drag the carousel
        pagination: false, // Hide pagination dots
    };

    return (
        <div className={`carousel ${styles.container}`}>
            <Splide hasTrack={ false } options={splideOptions}>
                <SplideTrack>{slides.map((slide: React.ReactNode, i: number) => <SplideSlide key={`slide-${i}`}>{slide}</SplideSlide>)}</SplideTrack>
                {slides.length > 1 ? (
                    <div className="splide__arrows">
                        <span className={`splide__arrow splide__arrow--prev ${styles.arrows} ${styles.prev}`}><IconChevronLeft /></span>
                        <span className={`splide__arrow splide__arrow--next ${styles.arrows} ${styles.next}`}><IconChevronRight /></span>
                    </div>
                ) : null}
            </Splide>
        </div>
    )
});

export default Carousel;