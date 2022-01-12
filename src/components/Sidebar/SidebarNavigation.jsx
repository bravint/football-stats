import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { StoreContext } from "../../store";

import styles from "../../styles/SidebarNavigation.module.css";

export const SidebarNavigation = () => {
    const store = useContext(StoreContext);

    const doDispatch  = (action, payload) => {
        store.dispatch({
            type: action,
            payload: payload
          })
    }

    return (
        <nav className={styles.navSection}>
            <ul className={styles.navListContainer}>
                <li className={styles.navListItem}>
                    <Link
                        className={styles.link}
                        to="/"
                        onClick={() => doDispatch('update/id', '')}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? `${styles.activeLink}` : `${styles.link}`
                        }
                        to="/standings"
                    >
                        Standings
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? `${styles.activeLink}` : `${styles.link}`
                        }
                        to="/fixtures"
                    >
                        Fixtures
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? `${styles.activeLink}` : `${styles.link}`
                        }
                        to="/results"
                    >
                        Results
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
