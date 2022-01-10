import { Link, NavLink } from "react-router-dom";

import styles from "../../styles/SidebarNavigation.module.css";

export const SidebarNavigation = (props) => {
    const { setId } = props;
    return (
        <nav className={styles.navSection}>
            <ul className={styles.navListContainer}>
                <li className={styles.navListItem}>
                    <Link
                        className={styles.link}
                        to="/"
                        onClick={() => setId("")}
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
