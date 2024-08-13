import Link from 'next/link';
import {IconOpenNew} from '@/_components/icons';
import styles from '@/_styles/external-link.module.scss';

const ExternalLink = ({url, text, rel, className}) => {
    return (
        <Link href={url} rel={rel ? 'noopener noreferrer' : null} target="_blank" className={`${styles.container} ${className || ''}`}>
            <>{text} <IconOpenNew/></>
        </Link>
    );
};

export default ExternalLink;