import { useEffect, useState } from "react";

import styles from "../../styles/Sidebar.module.css";

export const SidebarAddon = (props) => {
    const { league, id } = props;

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => window.pageYOffset > 50 ? setIsVisible(true) : setIsVisible(false)
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <>
            <ul>
                <li>
                    <img
                        src={
                            process.env.PUBLIC_URL + `/assets/images/${id}.svg`
                        }
                        alt="league logo"
                        className={styles.navLogo}
                    />
                </li>
                <br></br>
                <li>
                    <p className={styles.competitionOverview}>
                        {league.competition.name}
                    </p>
                </li>
                <li>
                    <p className={styles.competitionOverview}>
                        {league.competition.area.name}
                    </p>
                </li>
                <li>
                    <p className={styles.competitionOverview}>
                        Current Round:<br></br>
                        {league.season.currentMatchday} of{" "}
                        {league.standings[0].table.length * 2 - 2}
                    </p>
                </li>
            </ul>
            <section className={styles.footer}>
                {isVisible && (
                        <a href="#top">Return to Top</a>
                )}
            </section>
        </>
    );
};

export default SidebarAddon;
