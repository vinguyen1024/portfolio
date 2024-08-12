import {useRef, useEffect} from 'react';
import {useWindowSize} from '@/_hooks';
import {debounce} from '@/_utils';
import styles from '@/_styles/section.module.scss';

const Section = ({id, getActiveElement, children}) => {
    const ref = useRef();
    const windowSize = useWindowSize();

    /**
     * Intersection Observer to detect which section is currently showing
     */
    useEffect(() => {
        const threshold = Math.min(1, windowSize.height / ref.current.clientHeight * 0.6) || 0.75; // element fills 60% of the viewport

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: [threshold],
        };

        const observeCallback = debounce((entries) => {
        const [entry] = entries;
            if (entry.isIntersecting) {
                getActiveElement(entry.target.id);
            }
        }, 200);

        const observer = new IntersectionObserver(observeCallback, options);
        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.disconnect();
            }
        };
    }, [ref, windowSize]);

    return (
        <section id={id} ref={ref} className={['page-sections', 'flex', styles.container].join(' ')}>
            <div>{children}</div>
        </section>
    );
};

export default Section;