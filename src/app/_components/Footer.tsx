import React from 'react';
import { ExternalLink } from '@/_components';
import { IconLinkedIn, IconGitHub } from '@/_components/icons';
import { header, contact } from '@/_data/resume';
import styles from '@/_styles/footer.module.scss';

const Footer = () => {
    // lets only grab the links we need from contact
    const links = [
        {
            icon: <IconLinkedIn />,
            ...contact.linkedin
        }, {
            icon: <IconGitHub />,
            ...contact.github
        }
    ];
    return (
        <footer className={styles.container}>
            <div>
                <ul>
                    {links.map(({icon, text, href}, i) => (
                        <li key={`footer-links-${i}`}><a href={href} title={text} rel="noopener noreferrer">{icon}</a></li>
                    ))}
                </ul>
                <p>© {header.title} {(new Date()).getFullYear()}</p>
            </div>
        </footer>
    )
};

export default Footer;