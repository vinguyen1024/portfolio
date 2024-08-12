import {IconOpenNew} from '@/_components/icons';
import styles from '@/_styles/external-link.module.scss';

const ExternalLink = ({url, text, rel, className}) => (
    <a href={url} rel={rel ? 'noopener noreferrer' : null} className={`${styles.container} ${className || null}`}>
        {text} <IconOpenNew/>
    </a>
);

export default ExternalLink;