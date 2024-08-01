import {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {IconChevronLeft, IconChevronRight} from '@/_components/icons';
import {debounce} from '@/_utils';
import styles from '/styles/carousel.module.scss';

const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

const Carousel = ({images, width, height}) => {
    const [[page, direction], setPage] = useState([0, 0]);

    // Wrap within the length to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const imageIndex = wrap(0, images.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    width = width || 1000;

    const variants = {
        enter: (direction: number) => {
            return {
              x: direction > 0 ? width : width*-1,
              opacity: 0
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => {
            return {
              zIndex: 0,
              x: direction < 0 ? width : width*-1,
              opacity: 0
            };
        }
    };

    const onPrevClick = debounce(() => paginate(-1), 10);
    const onNextClick = debounce(() => paginate(1), 10);

    // go to previous or next slide on respective arrow keydown event
    const handleKeyPress = (e) => {
        if (37 == e.keyCode) {
            onPrevClick();
        }

        if (39 == e.keyCode) {
            onNextClick();
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => {
          window.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <motion.div className={styles.container} style={{ height: `${height}px` || '100vh' }}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={page}
                  src={images[imageIndex]}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  style={{ height: `${height}px` || '100vh' }}
                />
            </AnimatePresence>
            {images.length > 1 && <div className={`${styles.arrows} ${styles.prev}`} onClick={onPrevClick}><IconChevronLeft /></div>}
            {images.length > 1 && <div className={`${styles.arrows} ${styles.next}`} onClick={onNextClick}><IconChevronRight /></div>}
        </motion.div>
    );
};

export default Carousel;