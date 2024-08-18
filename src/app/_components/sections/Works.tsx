import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import { WorkModal } from '@/_components';
import { IconOpenFull } from '@/_components/icons';
import { WorkProps } from '@/_utils/types';
import { works } from '@/_data/works';
import styles from '@/_styles/works.module.scss';

interface Props extends WorkProps {
    layoutId?: string; // layoutId will be added dynamically
    handleClose?: () => void; // handleClose will be passed to the WorkModal
}

const Works: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const handleClose = () => setSelectedItem(null);
    const handleShow = (item: number) => setSelectedItem(item);

    return (
        <>
            <h2>Works</h2>
            <div className={styles.container}>
                <ul>
                    {works.map((work: Props, i: number) => {
                        return (
                            <motion.li key={`works-${i}`} layoutId={`works-${i}`} 
                                    onClick={() => selectedItem === null && handleShow(i)}>
                                <span>
                                    <Image
                                        src={work.images[0].src}
                                        alt={work.images[0].alt}
                                        width={790}
                                        height={222}
                                        quality={80}
                                        sizes="395px"
                                        placeholder="blur"
                                        blurDataURL={work.base64}
                                      />
                                      <IconOpenFull />
                                </span>
                            </motion.li>
                        );
                    })}
                </ul>
                {selectedItem !== null && <WorkModal layoutId={`works-${selectedItem}`} {...works[selectedItem]} handleClose={handleClose} />}
            </div>
        </>
    );
};

export default Works;