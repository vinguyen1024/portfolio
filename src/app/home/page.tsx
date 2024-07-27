"use client";
import {useState, useEffect, useRef, useCallback} from 'react';
import {useRouter} from 'next/navigation';
import Header, {HeaderSection} from '@/_components/Header';
import Section from '@/_components/Section';
import debounce from '@/_utils/debounce';
import scrollIntoViewCallback from '@/_utils/scrollIntoViewCallback';
import {sections} from '@/data/sections';
import styles from '/styles/home.module.scss';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleWindowResize);
        // Call handler right away so state gets updated with initial window size
        handleWindowResize();

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    return windowSize;
};

const Home = () => {
    /**
     * Attaching event listeners for sticky header
     */
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollDirection, setScrollDirection] = useState(false);
    const windowSize = useWindowSize();

    useEffect(() => {
        let lastScrollTop = 0;
        const onScroll = () => {
            const {scrollTop} = document.body;
            // detect which direction the page scrolled
            setScrollDirection(lastScrollTop < scrollTop ? 'down' : 'up');
            lastScrollTop = scrollTop;

            // detect if the page scrolled past splash
            setIsScrolled(scrollTop > windowSize.height/2);

            // set the current view to null when scrolled to top
            if (scrollTop < windowSize.height/2) {
                setCurrentView(null);
            }
        };
        window.addEventListener("scroll", onScroll, true);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll, true);
    }, [windowSize]);

    // useEffect(()=> {
    //     const hash = window.location.hash;
    //     setCurrentView(hash || '/');
    //     setActiveElement(hash.replace(/.*\#/, '')||'header');
    // });

    // const sectionRef = useRef([]);
    // const router = useRouter();

    // const scrollElementIntoView = (id, href) => {
    //     const element = sectionRef[id];
    //     element.scrollIntoView({behavior: "smooth"});

    //     scrollIntoViewCallback(element, () => {
    //         // callback to replace router and set active navigation
    //         // once element is scrolled into view
    //         router.replace(href);
            
    //         setCurrentView(href);
    //         setActiveElement(id);
    //     })
    // }

    /**
     * OnClick event handling for the navigation
     */
    const onClickHandler = (e) => {
        e.preventDefault();
        const {element, href} = e.currentTarget.dataset;
        if (href == (window.location.hash || '/')) {
            return;
        }
        // scrollElementIntoView(element, href);
    };

    /**
     * Intersection Observer to detect which section is currently showing
     */
    const sectionRef = useRef([]);
    const [currentView, setCurrentView] = useState(null);

    let observers = [];
    useEffect(() => {
        sections.map(({id}, i) => {
            observers[i] = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    console.info(entry.target.id, entry.intersectionRatio, entry.isIntersecting);
                    if (entry.intersectionRatio > 0.1 && entry.isIntersecting) {
                        setCurrentView(entry.target.id);
                    }
                });
            }, {
                root: null,
                rootMargin: "0px",
                threshold: [0.2, 0.8],
            });
            observers[i].observe(sectionRef[id]);

            return () => {
                observers[i].disconnect();
            };
        });
    }, [sectionRef, observers]);

    return (
        <div className={styles.container}>
            <Header scrolled={isScrolled} scrollDirection={scrollDirection}>
                <Section id="header" flex={false}>
                    <div><HeaderSection onClickHandler={onClickHandler} activeElement={currentView} /></div>
                </Section>
            </Header>
            <main className={styles.main}>
                { sections.map(({id, content}, i) => (
                    <Section key={id} id={id} ref={el => sectionRef[id] = el}>
                        <div dangerouslySetInnerHTML={{__html: content}} />
                    </Section>
                )) }
            </main>
            <footer />
        </div>
    )
};

export default Home;