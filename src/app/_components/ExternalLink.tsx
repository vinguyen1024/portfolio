import React from 'react';
import Link from 'next/link';
import { IconOpenNew } from '@/_components/icons';
import styles from '@/_styles/external-link.module.scss';

interface Props {
    url: string;
    text: string;
    rel?: boolean | null;
    className?: string;
}

const ExternalLink: React.FC<Props> = ({url, text, rel, className = ''}) => (
    <Link href={url} rel={rel ? 'noopener noreferrer' : undefined} target="_blank" className={`${styles.container} ${className}`}>
        {text} <IconOpenNew/>
    </Link>
);

export default ExternalLink;