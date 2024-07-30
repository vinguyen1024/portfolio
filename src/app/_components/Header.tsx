import {useRef, useEffect, useState} from 'react';
import Link from 'next/link';
import {Heading, Section} from '@/_components/';
import {useWindowSize} from '@/_hooks';
import {contact} from '@/_data/resume';
import styles from '/styles/header.module.scss';

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
    // {
    //  name: 'Resume',
    //  href: '/resume',
    //  target: '_blank', 
    //  prefetch: false,
    // },
    {
        name: 'Contact', 
        href: contact.email.href
    },
];

const Header = ({children}) => {

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
                // setCurrentView(null);
            }
        };
        window.addEventListener("scroll", onScroll, true);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll, true);
    }, [windowSize]);

    const onClickHandler = null;

    return (
        <header className={['flex', styles.container, isScrolled ? styles.scrolled : null, scrollDirection && 'down' === scrollDirection ? styles.down : null].join(' ')}>
            <Section id="header" flex={false}>
                <Link href="/" className={styles.logo} onClick={onClickHandler} replace data-element="header" data-href="/">
                    <Heading />
                </Link>
                <nav>
                    <ul>
                        {navigation.map(({name, onClick, ...props}) => {
                            const element = name.toLocaleLowerCase();
                            // const isActive = activeElement == element;
                            const isActive = null;
                            return (
                                <li key={`navigation-${element}`} className={isActive ? styles.active : null}>
                                    <Link {...props} onClick={onClick ? onClickHandler : null} data-element={element} data-href={props.href}>{name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </Section>
        </header>
    );
};

export default Header;