import { useEffect, useState } from 'react';

import styles from '../../styles/App.module.css';

export const SkipToContentButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () =>
            window.event.keyCode === 9
                ? setIsVisible(true)
                : setIsVisible(false);

        window.addEventListener('keydown', toggleVisibility);

        return () => window.removeEventListener('keydown', toggleVisibility);
    }, []);

    return (
        <>
            {isVisible && (
                <a className={styles.skipButton} href="#league-select-form">
                    Skip Navigation
                </a>
            )}
        </>
    );
};
