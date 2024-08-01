import styles from '/styles/chip.module.scss';

const Chip = ({items, name}) => (
    <ul className={styles.container}>
        {items.map((item, i) => <li key={`${name}-${i}`}>{item}</li>)}
    </ul>
);

export default Chip;