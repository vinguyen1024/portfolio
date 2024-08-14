import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/_components/';
import { IconDark, IconLight } from '@/_components/icons';
import { useWindowSize } from '@/_hooks';
import { contact, metaData } from '@/_data/resume';
import styles from '@/_styles/header.module.scss';

// Navigation item type
interface NavigationItem {
    name: string;
    href: string;
    onClick?: boolean;
}

// Navigation items
const navigation: NavigationItem[] = [
    {
        name: 'About',
        href: '#about',
        onClick: true
    },
    {
        name: 'Experience',
        href: '#experience',
        onClick: true
    },
    {
        name: 'Works',
        href: '#works',
        onClick: true
    },
    {
        name: 'Contact',
        href: contact.email.href
    },
];

// Type for scroll direction
type Direction = "up" | "down";

interface Props {
    activeElement: string;
    updateActiveElement: (activeId: string)=>void;
    onIconClick: ()=>void;
    theme: 'light' | 'dark';
};

const Header: React.FC<Props> = ({ activeElement, updateActiveElement, onIconClick, theme }) => {

    /**
     * Attaching event listeners for sticky header
     */
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [scrollDirection, setScrollDirection] = useState<Direction | false>(false);
    const windowSize = useWindowSize();

    useEffect(() => {
        let lastScrollTop = 0;

        const onScroll = () => {
            const { scrollTop } = document.body;
            const direction = lastScrollTop > scrollTop ? 'up' : 'down';

            // detect which direction the page scrolled
            setScrollDirection(direction);
            lastScrollTop = scrollTop;

            // detect if the page scrolled past splash
            setIsScrolled(scrollTop > (windowSize.height ?? 0) / 2);

            // set the current view to null when scrolled to top
            if (scrollTop < (windowSize.height ?? 0) / 2) {
                updateActiveElement('');

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
    const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const {element, href} = (e.currentTarget as HTMLElement).dataset;

        // no need to trigger scrollIntoView if we're already there
        if (href == activeElement) {
            return;
        }

        document.getElementById(element ?? '')?.scrollIntoView({behavior: "smooth"});
    };


    return (
        <header id="header" className={[
            'flex', 
            styles.container, 
            isScrolled ? styles.scrolled : '', 
            scrollDirection && 'down' === scrollDirection ? styles.down : ''
        ].join(' ')}>
            <section id="header">
                <div>
                    <Link href="/" className={styles.logo} onClick={onClickHandler} replace data-element="header" data-href="/">
                        <Heading />
                    </Link>
                    <nav>
                        <ul>
                            {navigation.map(({name, href, onClick}) => {
                                const element = name.toLocaleLowerCase();
                                const isActive = activeElement == element;
                                return (
                                    <li key={`navigation-${element}`} className={isActive ? styles.active : undefined}>
                                        <Link href={href} onClick={onClick ? onClickHandler : undefined} data-element={element} data-href={href}>{name}</Link>
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
