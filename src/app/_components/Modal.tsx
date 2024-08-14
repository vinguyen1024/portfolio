import React, { useEffect } from 'react';
import { IconClose } from '@/_components/icons';
import { motion, AnimatePresence } from "framer-motion";
import styles from '@/_styles/modal.module.scss';

interface Props {
    show: boolean;
    title?: string;
    handleClose: () => void;
    layoutId?: string;
    children?: React.ReactNode;
}


const Modal: React.FC<Props> = ({ show, title, handleClose, layoutId, children }) => {
    const handleKeyPress = (e: KeyboardEvent) => {
        // close modal on escape
        if (e.key === 'Escape' || e.keyCode === 27) {
            handleClose();
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => {
          window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.div className={`${styles.container} ${show ? styles.show : ''}`} key="modal">
                <motion.div
                    className={styles.backdrop}
                    key="backdrop"
                    onClick={handleClose}
                    variants={{
                        hidden: {
                            opacity: 0,
                            transition: {
                                duration: 0.16
                            }
                        },
                        visible: {
                            opacity: 1,
                            transition: {
                                delay: 0.04,
                                duration: 0.2
                            }
                        }
                    }}
                    initial="hidden"
                    exit="hidden"
                    animate="visible"
                />
                <motion.div className={`inner ${styles.inner}`} layoutId={`${layoutId}`}>
                    <span className={styles.close} onClick={handleClose}><IconClose /></span>
                    {title && <div className={styles.title}>{title}</div>}
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Modal;