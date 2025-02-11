import React, {useRef, useEffect, useState} from 'react';
import {useWindowSize} from '@/_hooks';
import {debounce} from '@/_utils';
import styles from '@/_styles/section.module.scss';

interface Props {
    id: string;
    updateActiveElement: (isIntersecting: boolean, activeId: string) => void;
    children: React.ReactNode
};

const Section: React.FC<Props> = ({id, updateActiveElement, children}) => {
    const ref = useRef<HTMLElement | null>(null);
    const windowSize = useWindowSize();
    const [isInterSecting, setIsIntersecting] = useState(false);

    /**
     * Intersection Observer to detect which section is currently showing
     */
    useEffect(() => {

        if (!ref.current) {
            return;
        }

        const threshold = Math.min(1, (windowSize.height ?? 0) / ref.current.clientHeight * 0.6) || 0.75; // element fills 60% of the viewport

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: [threshold],
        };

        const observeCallback = debounce((entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
            setIsIntersecting(entry.isIntersecting);
            if (entry.isIntersecting) {
                updateActiveElement(true, entry.target.id);
            }
        }, 200);

        const observer = new IntersectionObserver(observeCallback, options);

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [windowSize]);

    const activeClassName = isInterSecting ? styles.active : '';

    return (
        <section id={id} ref={ref} className={`page-sections flex ${activeClassName} ${styles.container}`}>
            {children}
        </section>
    );
};

export default Section;