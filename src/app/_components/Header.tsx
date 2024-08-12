import {useRef, useEffect, useState} from 'react';
import Link from 'next/link';
import {Heading, Section} from '@/_components/';
import {IconDark, IconLight} from '@/_components/icons';
import {useWindowSize} from '@/_hooks';
import {debounce} from '@/_utils';
import {contact, metaData} from '@/_data/resume';
import styles from '@/_styles/header.module.scss';

const navigation = [
    {
        name: 'About', 
        href: '#about', 
        scroll: false,
        onClick: true
    },
    {
        name: 'Experience', 
        href: '#experience', 
        scroll: false,
        onClick: true
    },
    {
        name: 'Works', 
        href: '#works', 
        scroll: false,
        onClick: true
    },
    {
        name: 'Contact', 
        href: contact.email.href
    },
];

const Header = ({
        activeElement, 
        getActiveElement, 
        onIconClick,
        theme, 
        children
    }) => {

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
            const direction = lastScrollTop > scrollTop ? 'up' : 'down';
            // detect which direction the page scrolled
            setScrollDirection(direction);
            lastScrollTop = scrollTop;

            // detect if the page scrolled past splash
            setIsScrolled(scrollTop > windowSize.height/2);

            // set the current view to null when scrolled to top
            if (scrollTop < windowSize.height/2) {
                getActiveElement(null);

                // lets remove any hashes from the url if we're scrolling back to the top
                if (direction === 'up') {
                    history.replaceState({}, metaData.title, window.location.href.split('#')[0]);
                }
            }
        };
        window.addEventListener("scroll", onScroll, true);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll, true);
    }, [windowSize]);


    /**
     * OnClick event handling for the navigation
     */
    const onClickHandler = (e) => {
        e.preventDefault();
        const {element, href} = e.currentTarget.dataset;

        // no need to trigger scrollIntoView if we're already there
        if (href == window.location.hash) {
            return;
        }
        
        document.getElementById(element).scrollIntoView({behavior: "smooth"});
    };


    return (
        <header id="header" className={['flex', styles.container, isScrolled ? styles.scrolled : null, scrollDirection && 'down' === scrollDirection ? styles.down : null].join(' ')}>
            <section id="header">
                <div>
                    <Link href="/" className={styles.logo} onClick={onClickHandler} replace data-element="header" data-href="/">
                        <Heading />
                    </Link>
                    <nav>
                        <ul>
                            {navigation.map(({name, onClick, ...props}) => {
                                const element = name.toLocaleLowerCase();
                                const isActive = activeElement == element;
                                return (
                                    <li key={`navigation-${element}`} className={isActive ? styles.active : null}>
                                        <Link {...props} onClick={onClick ? onClickHandler : null} data-element={element} data-href={props.href}>{name}</Link>
                                    </li>
                                )
                            })}
                            <li>
                                <span className={styles.theme} onClick={onIconClick} title={`Enable ${theme === 'light'? 'dark' : 'light'} mode`}>
                                    {theme === 'light' ? <IconDark /> :<IconLight />}
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </header>
    );
};

export default Header;