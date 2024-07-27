import {useRef, useEffect, useState} from 'react';
import Link from 'next/link';
import Typed from 'typed.js';
import {header, contact} from '@/data/resume';
import styles from '/styles/header.module.scss';

const navigation = [
	{
		name: 'About', 
		href: '#about', 
		scroll: false,
		onClick: true
	},
	{
		name: 'Projects', 
		href: '#projects', 
		scroll: false,
		onClick: true
	},
	{
		name: 'Resume',
		href: '/resume',
		target: '_blank', 
		prefetch: false,
	},
	{
		name: 'Contact', 
		href: contact.email.href
	},
];

export const HeaderSection = ({onClickHandler, activeElement}) => {
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
			<Link href="/" className={styles.logo} onClick={onClickHandler} replace data-element="header" data-href="/">
				<h1 ref={headingEl}>{header.title}</h1>
				<div ref={subHeadingEl}>{`${header.position}.`}</div>
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
				</ul>
			</nav>
		</>
	);
};

const Header = ({scrolled, scrollDirection, children}) => (
	<header className={['flex', styles.container, scrolled ? styles.scrolled : null, scrollDirection && 'down' === scrollDirection ? styles.down : null].join(' ')}>
		{children}
	</header>
);

export default Header;