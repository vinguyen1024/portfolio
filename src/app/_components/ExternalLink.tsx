import {IconOpenNew} from '@/_components/icons';
import styles from '/styles/externallink.module.scss';

const ExternalLink = ({url, text, rel, className}) => (
    <a href={url} rel={rel ? 'noopener noreferrer' : null} className={`${styles.container} ${className || null}`}>
        {text} <IconOpenNew/>
    </a>
);

export default ExternalLink;