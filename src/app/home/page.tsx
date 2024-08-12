"use client";
import { useState } from 'react';
import { Header, Main } from '@/_components';
import { metaData } from '@/_data/resume';
import styles from '@/_styles/home.module.scss';

const Home = () => {
    /**
     * OnClick handler for theme
     */
    const [theme, setTheme] = useState('light');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const onIconClick = () => {
        if (newTheme === 'light') {
            document.body.classList.remove('dark');
        } else {
            document.body.classList.add('dark');
        }
        setTheme(newTheme);
    };

    /**
     * Callback to set the current view and update history
     */
    const [currentView, setCurrentView] = useState(null);
    const getActiveElement = (activeId) => {
        const hashId = window.location.hash.substring(1);

        // update the route to current view. we're checking to see 
        // if the hash and active doesn't match so we don't end up
        // replacing the route on page load
        if (activeId && hashId !== activeId) {
            history.replaceState({}, metaData.title, `#${activeId}`);
        }
        setCurrentView(activeId);
    };

    return (
        <div className={styles.container}>
            {theme === 'light' && <div className={styles.background} />}
            <Header {...{onIconClick, getActiveElement, theme}} activeElement={currentView} />
            <Main getActiveElement={getActiveElement}/>
            <footer />
        </div>
    )
};

export default Home;