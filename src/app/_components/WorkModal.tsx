import {Chip, Carousel, Modal} from '@/_components';
import Image from 'next/image';
import {IconOpenNew} from '@/_components/icons';
import styles from '/styles/workmodal.module.scss';

const WorkModal = (({title, images, content, links, date, technologies, layoutId, handleClose}) => {
    return (
        <Modal layoutId={layoutId} show={true} handleClose={handleClose}>
            <Carousel>
            {
                images.map((props, i) => (
                    <Image
                        {...props}
                        draggable="false"
                        key={`work-${layoutId}_image-${i}`}
                        width={640}
                        height={360}
                      />
                ))
            }
            </Carousel>
            <div className={styles.container}>
                <h3>{title}</h3>
                <div className={styles.content}>
                    <p className={styles.date}>{date}</p>
                    <p>{content}</p>
                    <ul className={styles.urls}>
                        {links && links.map(({text, url}, i) => 
                            <li key={`work-${layoutId}_link-${i}`}>
                                <a href={url} rel="noopener noreferrer">{text} <IconOpenNew/></a>
                            </li>
                        )}
                    </ul>
                    <Chip items={technologies} name={`work-${layoutId}_tech`} />
                </div>
            </div>
        </Modal>
    );
});

export default WorkModal;