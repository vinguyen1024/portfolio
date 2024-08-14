import React from 'react';
import styles from '@/_styles/chip.module.scss';

interface Props {
    items: string[];
    name?: string;
}

const Chip: React.FC<Props> = ({items, name = 'chips'}) => (
    <ul className={styles.container}>
        {items.map((item, i) => (
            <li key={`${name}-${i}`}>{item}</li>
        ))}
    </ul>
);

export default Chip;