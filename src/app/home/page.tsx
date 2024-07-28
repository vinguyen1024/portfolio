"use client";
import {useState, useEffect, useRef, useCallback} from 'react';
import {useRouter} from 'next/navigation';
import {Header, Section} from '@/_components';
import {debounce, observer} from '@/_utils';
import {sections} from '@/data/sections';
import styles from '/styles/home.module.scss';

const Home = () => {
    // useEffect(()=> {
    //     const hash = window.location.hash;
    //     setCurrentView(hash || '/');
    //     setActiveElement(hash.replace(/.*\#/, '')||'header');
    // });

    // const sectionRef = useRef([]);
    const router = useRouter();

    // const scrollElementIntoView = (id, href) => {
    //     const element = sectionRef[id];
    //     element.scrollIntoView({behavior: "smooth"});

    //     observer(element, () => {
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
        sectionRef[element].scrollIntoView({behavior: "smooth"});
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
                    if (entry.intersectionRatio > 0.1 && entry.isIntersecting) {
                        setCurrentView(entry.target.id);
                        // router.replace(`#${entry.target.id}`);
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
            <Header onClickHandler={onClickHandler} activeElement={currentView} />

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