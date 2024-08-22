import { useState, useEffect } from 'react';
import { debounce } from '@/_utils';

export interface Size {
    width: number | undefined;
    height: number | undefined;
}

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<Size>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        // Handler to call on resize event
        const handleWindowResize = debounce(() => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }, 200);

        // Add event listener
        window.addEventListener('resize', handleWindowResize);

        // Call handler right away to set initial window size
        handleWindowResize();

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return windowSize;
};

export default useWindowSize;