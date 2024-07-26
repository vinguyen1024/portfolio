"use client";
import {useState, useEffect, useRef, useCallback} from 'react';
import {useRouter} from 'next/navigation';
import Header, {HeaderSection} from '@/_components/Header';
import Section from '@/_components/Section';
import debounce from '@/_utils/debounce';
import scrollIntoViewCallback from '@/_utils/scrollIntoViewCallback';
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
    const [isScrolled, setIsScrolled] = useState(false);
    const windowSize = useWindowSize();

    useEffect(() => {
        /**
         * Attaching event listeners for sticky header
         */
        const onScroll = () => setIsScrolled(document.documentElement.scrollTop > windowSize.height/2);
        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [windowSize]);

    // detect current section on the page
    useEffect(()=> {
        const onPageScroll = debounce(() => {
            document.querySelectorAll('.page-sections').forEach((element) => scrollIntoViewCallback(element, () => {
                // callback to replace router and set active navigation
                // once element is scrolled into view
                /*router.replace(href);
                
                setCurrentView(href);
                setActiveElement(id);*/
                console.info(element);
            }));
        }, 500);

        window.addEventListener("scroll", onPageScroll);
        onPageScroll();
        return () => window.removeEventListener("scroll", onPageScroll);
    });

    const [currentView, setCurrentView] = useState(null);
    const [activeElement, setActiveElement] = useState(false);

    useEffect(()=> {
        const hash = window.location.hash;
        setCurrentView(hash || '/');
        setActiveElement(hash.replace(/.*\#/, '')||'header');
    });

    const sectionRef = useRef([]);
    const router = useRouter();

    const scrollElementIntoView = (id, href) => {
        const element = sectionRef[id];
        element.scrollIntoView({behavior: "smooth"});

        scrollIntoViewCallback(element, () => {
            // callback to replace router and set active navigation
            // once element is scrolled into view
            router.replace(href);
            
            setCurrentView(href);
            setActiveElement(id);
        })
    }

    const onClickHandler = (e) => {
        e.preventDefault();
        const {element, href} = e.currentTarget.dataset;
        if (href == (window.location.hash || '/')) {
            return;
        }
        scrollElementIntoView(element, href);
    };

    return (
        <div className={styles.container}>
            <Header scrolled={isScrolled}>
                <Section id="header" flex={false} ref={el => sectionRef['header'] = el}>
                    <HeaderSection onClickHandler={onClickHandler} activeElement={activeElement} />
                </Section>
            </Header>
            <main className={styles.main}>
                <Section id="about" ref={el => sectionRef['about'] = el}>
                    <h2>About</h2>
                    <p>Doggo ipsum you are doing me a frighten pupperino. Long doggo big ol pupper mlem wrinkler dat tungg tho very jealous pupper shoob, super chub I am bekom fat blop fat boi.  Wow such tempt I am bekom fat long water shoob, heck. Many pats stop it fren corgo doing me a frighten sub woofer, long water shoob you are doin me a concern. Super chub you are doing me a frighten he made many woofs smol borking doggo with a long snoot for pats yapper, long water shoob floofs very good spot. many pats pats. Yapper corgo shibe wow such tempt extremely cuuuuuute blop length boy, smol pats maximum borkdrive very good spot. Adorable doggo doggorino boofers boof puggo pupperino, maximum borkdrive wow such tempt noodle horse.</p>
                </Section>
                <Section id="projects" ref={el => sectionRef['projects'] = el}>
                    <h2>Projects</h2>
                    <p>Doggo ipsum you are doing me a frighten pupperino. Long doggo big ol pupper mlem wrinkler dat tungg tho very jealous pupper shoob, super chub I am bekom fat blop fat boi.  Wow such tempt I am bekom fat long water shoob, heck. Many pats stop it fren corgo doing me a frighten sub woofer, long water shoob you are doin me a concern. Super chub you are doing me a frighten he made many woofs smol borking doggo with a long snoot for pats yapper, long water shoob floofs very good spot. many pats pats. Yapper corgo shibe wow such tempt extremely cuuuuuute blop length boy, smol pats maximum borkdrive very good spot. Adorable doggo doggorino boofers boof puggo pupperino, maximum borkdrive wow such tempt noodle horse.</p>
                </Section>
            </main>
            <footer />
        </div>
    )
};

export default Home;