import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { STORE_ACTIONS } from '../../config';
import { StoreContext } from '../../store';

import styles from '../../styles/NotFound.module.css';

export const NotFound = () => {
    const store = useContext(StoreContext);

    const handleDispatch = (action, payload) => {
        store.dispatch({
            type: action,
            payload: payload,
        });
    };

    return (
        <div className={styles.container}>
            <p>ERROR 404 : PAGE NOT FOUND</p>
            <li className={styles.navListItem}>
                <Link
                    className={styles.link}
                    to="/"
                    onClick={() => handleDispatch(STORE_ACTIONS.ID, '')}
                >
                    Return to Home Page
                </Link>
            </li>
        </div>
    );
};
