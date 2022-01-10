import { useEffect, useState } from 'react';

import styles from '../../styles/App.module.css';

export const ReturnToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () =>
            window.pageYOffset > 50 ? setIsVisible(true) : setIsVisible(false);
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <>
            {isVisible && (
                <a className={styles.returnButton} href="#top">
                    Return to Top
                </a>
            )}
        </>
    );
};
