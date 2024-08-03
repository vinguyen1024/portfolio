import {Children, useRef, useEffect, useState, useImperativeHandle} from 'react';
import {animate, AnimationOptions, motion, MotionStyle, PanInfo, useMotionValue} from "framer-motion";
import {IconChevronLeft, IconChevronRight} from '@/_components/icons';
import {debounce} from '@/_utils';
import styles from '/styles/carousel.module.scss';

const transition: AnimationOptions<any> = {
    type: "spring",
    bounce: 0,
};

const Carousel = (({children, height, loop = true}) => {
    const x = useMotionValue(0);
    const containerRef = useRef();
    const [index, setIndex] = useState(0);

    const calculateNewX = () => (-index * (containerRef.current?.clientWidth || 0));

    const slides = Children.toArray(children);
    const totalSlides = slides.length;

    const handleEndDrag = debounce((e: Event, dragProps: PanInfo) => {
        const clientWidth = containerRef.current?.clientWidth || 0;
        const {offset} = dragProps;
        const dragFromLast = index + 1 === totalSlides && offset.x < 0;
        const dragFromFirst = index === 0 && offset.x > 0;

        if (!loop && (dragFromLast || dragFromFirst)) {
            animate(x, calculateNewX(), transition);
            return;
        }

        if (offset.x > clientWidth / 4) {
            handlePrev();
        } else if (offset.x < -clientWidth / 4) {
            handleNext();
        } else {
            animate(x, calculateNewX(), transition);
        }
    }, 1);

    const handleNext = debounce(() => {
        const idx = loop ? 0 : index;
        setIndex(index + 1 === totalSlides ? idx : index + 1);
    }, 1);

    const handlePrev = debounce(() => {
        const idx = loop ? totalSlides - 1 : 0;
        setIndex(index - 1 < 0 ? idx : index - 1);
    }, 1);

    useEffect(() => {
        const controls = animate(x, calculateNewX(), transition);
        return controls.stop;
    }, [index]);

    return (
        <div ref={containerRef} className={styles.container}>
            {slides.map((slide, i) => {
                const slideStyles = {
                    x,
                    left: `${i * 100}%`,
                    right: `${i * 100}%`,
                    height: height
                };
                return (
                    <motion.div className={styles.slide}
                        style={slideStyles}
                        drag={slides.length > 1 && "x"}
                        dragElastic={0.3}
                        onDragEnd={handleEndDrag}
                        key={`carousel-item-${i}`}>
                        {slide}
                    </motion.div>
                )
            })}
            {slides.length > 1 && <div className={`${styles.arrows} ${styles.prev}`} onClick={handlePrev}><IconChevronLeft /></div>}
            {slides.length > 1 && <div className={`${styles.arrows} ${styles.next}`} onClick={handleNext}><IconChevronRight /></div>}
        </div>
    )
});

export default Carousel;