import {useRef, useEffect} from 'react';
import {header} from '@/data/resume';
import Typed from 'typed.js';

const Heading = () => {
	const headingEl = useRef([]);
	const subHeadingEl = useRef([]);

	useEffect(() => {
		// Common params used in both Typed instances 
		const typedParams = {
			typeSpeed: 50,
			showCursor: false,
			onBegin: (self) => {
				// Elements currently have opacity set to '0' on page load
				// to hide the initial text (for SEO purposes). Adding 
				// className to display the typing effect
				self.el.classList.add('display');
			},
		};
		const typedHeading = new Typed(headingEl.current, {
			...typedParams,
			strings: [`&lt;${header.title}/&gt;`],
			onComplete: (self) => {
				// Updating class and text of the header so the html symbols 
				// are added via pseudo-elements
				self.el.classList.add('complete');
				self.el.textContent = header.title;
			},
		});
		const typedSubHeading = new Typed(subHeadingEl.current, {
			...typedParams,
			strings: [
				'Front-end enthusiast.', 
				'Electronic music lover.', 
				'Dog owner.', 
				'Casual gamer.', 
				`${header.position}.`
			],
			startDelay: 2250,
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