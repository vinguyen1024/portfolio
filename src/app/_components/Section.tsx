import {useRef, useEffect} from 'react';
import {debounce} from '@/_utils';
import styles from '/styles/section.module.scss';

const Section = ({id, getActiveElement, children}) => {
	const ref = useRef();

    /**
     * Intersection Observer to detect which section is currently showing
     */
	const options = {
        root: null,
        rootMargin: "0px",
        threshold: [0.75],
    };

	const observeCallback = debounce((entries) => {
        const [entry] = entries;
        if (entry.intersectionRatio >= 0.75 && entry.isIntersecting) {
            getActiveElement(entry.target.id);
        }
    }, 200);

    useEffect(() => {
        const observer = new IntersectionObserver(observeCallback, options);
        if (ref.current) {
        	observer.observe(ref.current);
        }

        return () => {
        	if (ref.current) {
	            observer.disconnect();
	        }
        };
    }, [ref, options, observeCallback]);

	return (
		<section id={id} ref={ref} className={['page-sections', 'flex', styles.container].join(' ')}>
			<div>{children}</div>
		</section>
	);
};

export default Section;