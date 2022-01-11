import { fixTeamName, getLogo } from '../../../utils.js';

import styles from '../../../styles/FixturesListItem.module.css';

export const CancelledListItem = (props) => {
    const { cancelledMatches, teams, id } = props;

    return (
        <>
            {cancelledMatches.map((element) => {
                return (
                    <li className={styles.matchList} key={element.id}>
                        <section className={styles.matchDetails}>
                            <p className={styles.homeTeam}>
                                {fixTeamName(id, element.homeTeam.name)}
                            </p>
                            <img
                                src={getLogo(element.homeTeam.id, teams)}
                                alt="club logo"
                                className="club-logo"
                            ></img>
                            <p>C - C</p>
                            <img
                                src={getLogo(element.awayTeam.id, teams)}
                                alt="club logo"
                                className="club-logo"
                            ></img>
                            <p className={styles.awayTeam}>
                                {fixTeamName(id, element.awayTeam.name)}
                            </p>
                        </section>
                    </li>
                );
            })}
        </>
    );
};
