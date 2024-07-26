import Link from 'next/link';
import {header, contact} from '/data/resume';
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

export const HeaderSection = ({onClickHandler, activeElement}) => (
	<>
		<Link href="/" className={styles.logo} onClick={onClickHandler} replace data-element="header" data-href="/">
			<h1>{header.title}</h1>
			<span>{header.position}</span>
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

const Header = ({scrolled, children}) => (
	<header className={['flex', styles.container, scrolled ? styles.scrolled : null].join(' ')}>
		{children}
	</header>
);

export default Header;