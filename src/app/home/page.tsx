"use client";
import React, { useState, useEffect } from 'react';
import { Footer, Header, Main } from '@/_components';
import { metaData } from '@/_data/resume';
import styles from '@/_styles/home.module.scss';

type Theme = 'light' | 'dark';

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
    useEffect(() => {
        hashId = window.location.hash.substring(1);
    }, []);

    /**
     * Callback to set the current view and update history
     */
    const [currentView, setCurrentView] = useState<string>('');
    const updateActiveElement = (activeId: string) => {
        // Update route if needed
        if (activeId && hashId !== activeId) {
            history.replaceState({}, metaData.title, `#${activeId}`);
        }
        setCurrentView(activeId);
    };

    return (
        <div className={styles.container}>
            {theme === 'light' && <div className={styles.background} />}
            <Header {...{onIconClick, updateActiveElement, theme}} activeElement={currentView} />
            <Main updateActiveElement={updateActiveElement}/>
            <Footer />
        </div>
    )
};

export default Home;