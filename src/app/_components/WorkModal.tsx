import React from 'react';
import Image from 'next/image';
import { Chip, Carousel, ExternalLink, Modal } from '@/_components';
import { WorkProps } from '@/_utils/types';
import styles from '@/_styles/work-modal.module.scss';

interface Props extends WorkProps {
    layoutId: string;
    handleClose: () => void;
    children?: React.ReactNode;
};

const WorkModal: React.FC<Props> = ({ title, images, content, links, date, technologies, base64, layoutId, handleClose }) => (
    <Modal layoutId={layoutId} show={true} handleClose={handleClose}>
        <Carousel>
            {images.map((props, i) => (
                <Image
                    {...props}
                    draggable="false"
                    key={`work-${layoutId}_image-${i}`}
                    width={1280}
                    height={720}
                    quality={80}
                    priority={true}
                    placeholder="blur"
                    blurDataURL={base64}
                  />
            ))}
        </Carousel>
        <div className={styles.container}>
            <h3>{title}</h3>
            <div className={styles.content}>
                <p className={styles.date}>{date}</p>
                <p>{content}</p>
                { links && (
                    <ul className={styles.urls}>
                        {links.map(({text, url}, i) => 
                            <li key={`work-${layoutId}_link-${i}`}>
                                <ExternalLink {...{url, text}} rel={true} />
                            </li>
                        )}
                    </ul>
                )}
                <Chip items={technologies} name={`work-${layoutId}_tech`} />
            </div>
        </div>
    </Modal>
);

export default WorkModal;