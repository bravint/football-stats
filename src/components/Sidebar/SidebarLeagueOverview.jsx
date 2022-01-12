import styles from "../../styles/Sidebar.module.css";

export const SidebarLeagueOverview = (props) => {
    const { standings, id } = props;

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
                        {standings.competition.name}
                    </p>
                </li>
                <li>
                    <p className={styles.competitionOverview}>
                        {standings.competition.area.name}
                    </p>
                </li>    
                <br></br>    
                <li>
                    <p className={styles.competitionOverview}>
                        Current Round:<br></br>
                        {standings.season.currentMatchday} of{" "}
                        {standings.standings[0].table.length * 2 - 2}
                    </p>
                </li>
            </ul>
        </>
    );
};