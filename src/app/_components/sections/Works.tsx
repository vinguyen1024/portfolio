import {useState} from 'react';
import Image from 'next/image';
import {motion} from "framer-motion";
import {Section, WorkModal} from '@/_components';
import {works} from '@/_data/works';
import styles from '/styles/works.module.scss';

const Works = () => {
    const [selectedItem, setSelectedItem] = useState(false);

    const handleClose = () => setSelectedItem(false);
    const handleShow = (item) => setSelectedItem(item);

    return (
        <>
            <h2>Works</h2>
            <div className={styles.container}>
                <ul>
                    {works.map((work, i) => {
                        return (
                            <motion.li key={`works-${i}`} layoutId={`works-${i}`} 
                                    onClick={(e) => selectedItem === false && handleShow(i)}>
                                <Image
                                    src={work.images[0].src}
                                    alt={work.images[0].alt}
                                    width={640}
                                    height={360}
                                  />
                            </motion.li>
                        );
                    })}
                </ul>
                {selectedItem !== false && <WorkModal layoutId={`works-${selectedItem}`} {...works[selectedItem]} handleClose={handleClose} />}
            </div>
        </>
    );
};

export default Works;