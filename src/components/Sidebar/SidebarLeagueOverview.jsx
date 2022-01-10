import styles from "../../styles/Sidebar.module.css";

export const SidebarLeagueOverview = (props) => {
    const { league, id } = props;

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
                <br></br>    
                <li>
                    <p className={styles.competitionOverview}>
                        Current Round:<br></br>
                        {league.season.currentMatchday} of{" "}
                        {league.standings[0].table.length * 2 - 2}
                    </p>
                </li>
            </ul>
        </>
    );
};