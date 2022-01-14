import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { STORE_ACTIONS, URL } from '../../config';
import { StoreContext } from '../../store';

import styles from '../../styles/Sidebar.module.css';

export const SidebarNavigation = () => {
    const store = useContext(StoreContext);

    const doDispatch = (action, payload) => {
        store.dispatch({
            type: action,
            payload: payload,
        });
    };

    return (
        <nav className={styles.navSection}>
            <ul className={styles.navListContainer}>
                <li className={styles.navListItem}>
                    <Link
                        className={styles.link}
                        to="/"
                        onClick={() => doDispatch(STORE_ACTIONS.ID, '')}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? `${styles.activeLink}` : `${styles.link}`
                        }
                        to={URL.STANDINGS}
                    >
                        Standings
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? `${styles.activeLink}` : `${styles.link}`
                        }
                        to={URL.FIXTURES}
                    >
                        Fixtures
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? `${styles.activeLink}` : `${styles.link}`
                        }
                        to={URL.RESULTS}
                    >
                        Results
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
