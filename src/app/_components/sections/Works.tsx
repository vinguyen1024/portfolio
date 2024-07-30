import {useState} from 'react';
import Image from 'next/image';
import {Section} from '@/_components';
import {works} from '@/_data/works';
import styles from '/styles/works.module.scss';

const Works = () => {
    const [show, setShow] = useState(0);

    const handleClose = () => setShow(0);
    const handleShow = (item) => setShow(item);

    return (
        <Section id="projects">
            <h2>Works</h2>
            <div className={styles.container}>
                <ul>
                    {works.map((props, i) => {
                        // starting the index from 1 to use as reference for modal
                        i = i + 1;

                        const showModal = Boolean(show) && show === i;
                        return (
                            <li key={`works-${i}`} onClick={(e) => {handleShow(i)}}>
                                <Image
                                    // fill
                                    src={`/images/projects/${props.image}`}
                                    alt={props.title}
                                    width={640}
                                    height={360}
                                  />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Section>
    );
};

export default Works;