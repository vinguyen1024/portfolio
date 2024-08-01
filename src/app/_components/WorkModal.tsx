import {Chip, Carousel, Modal} from '@/_components';
import {IconOpenNew} from '@/_components/icons';
import styles from '/styles/workmodal.module.scss';

const WorkModal = (({title, images, content, links, technologies, layoutId, handleClose}) => {
    return (
        <Modal layoutId={layoutId} show={true} handleClose={handleClose}>
            <Carousel images={images} width={640} height={360} />
            <div className={styles.container}>
                <div className={styles.content}>
                    <h3>{title}</h3>
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