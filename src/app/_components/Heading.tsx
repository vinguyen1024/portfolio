import React, { useRef, useEffect } from 'react';
import { header } from '@/_data/resume';
import Typed from 'typed.js';

// Type declaration for Typed instance to include `el` property
interface TypedWithEl extends Typed {
    el: HTMLElement;
}

const Heading = () => {
    const headingEl = useRef<HTMLHeadingElement | null>(null);
    const subHeadingEl = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Elements currently have text in SSR for SEO purposes.
        // Clearing out the contents for a cleaner Typed effect
        if (headingEl.current) {
            headingEl.current.textContent = '';
        }
        if (subHeadingEl.current) {
            subHeadingEl.current.textContent = '';
        }

        // Common options used in both Typed instances
        const typedOptions = {
            typeSpeed: 50,
            showCursor: false,
            onBegin: (self: TypedWithEl) => {
                // Elements currently have opacity set to '0' on page load
                // to hide the initial text (for SEO purposes). Adding 
                // className to display the typing effect
                self.el.classList.add('display');
            }
        };

        const typedHeading = new Typed(headingEl.current, {
            ...typedOptions,
            strings: [`&lt;${header.title}/&gt;`],
            onComplete: (self: TypedWithEl) => {
                // Updating class and text of the header so the html symbols 
                // are added via pseudo-elements
                self.el.classList.add('complete');
                self.el.textContent = header.title;
            },
        });

        const typedSubHeading = new Typed(subHeadingEl.current, {
            ...typedOptions,
            strings: [
                'Front-end enthusiast.',
                'Dog owner.',
                'Electronic music lover.',
                'Casual gamer.',
                `${header.position}.`
            ],
            startDelay: 1500,
            backSpeed: 50,
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typedHeading.destroy();
            typedSubHeading.destroy();
        };
    }, []);

    return (
        <>
            <h1 ref={headingEl}>{header.title}</h1>
            <div ref={subHeadingEl}>{`${header.position}.`}</div>
        </>
    );
};

export default Heading;
