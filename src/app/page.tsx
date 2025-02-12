"use client";
import React, { useState, useEffect } from 'react';
import { Footer, Header, Main } from '@/_components';
import { DoodleHeart } from '@/_components/doodles';
import { title } from '@/_data/resume';
import styles from '@/_styles/home.module.scss';

type Theme = 'light' | 'dark';

interface ActiveElement {
    isIntersecting: boolean;
    activeId: string;
}

const Home: React.FC = () => {
    /**
     * OnClick handler for theme
     */
    const [theme, setTheme] = useState<Theme>('light');
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    
    // Toggle theme on icon click
    const onIconClick = () => {
        if (newTheme === 'light') {
            document.body.classList.remove('dark');
        } else {
            document.body.classList.add('dark');
        }
        setTheme(newTheme);
    };

    let hashId = '';
    let scrollTop = 0;
    useEffect(() => {
        hashId = window.location.hash.substring(1);
        scrollTop = document.body.scrollTop;
    }, []);

    /**
     * Callback to set the current view and update history
     */
    const [activeElement, setActiveElement] = React.useState<ActiveElement>({
        isIntersecting: false,
        activeId: '',
    });
    const updateActiveElement = (isIntersecting: boolean, activeId: string) => {
        // Update route if needed
        if (activeId && hashId !== activeId && scrollTop !== 0) {
            history.replaceState({}, title, `#${activeId}`);
        }
        setActiveElement({isIntersecting, activeId});
    };

    return (
        <div className={styles.container}>
            {theme === 'light' && <div className={styles.background} />}
            <div className={styles.heart}><DoodleHeart /></div>
            <Header {...{onIconClick, activeElement, updateActiveElement, theme}} />
            <Main updateActiveElement={updateActiveElement}/>
            <Footer />
        </div>
    )
};

export default Home;