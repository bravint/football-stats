import { getDate, getLogo, fixTeamName } from '../../../utils.js';

import styles from '../../../styles/FixturesListItem.module.css';

export const ResultsListItem = (props) => {
    const { nested, id, teams } = props;

    return (
        <>
            <h3 className={styles.title}>{getDate(nested[0].utcDate)}</h3>
            {nested.map((element, index) => {
                return (
                    <li className={styles.matchList} key={element.id}>
                        <section
                            className={styles.matchDetails}
                            tabIndex={index + 1}
                        >
                            <p className={styles.homeTeam}>
                                {fixTeamName(id, element.homeTeam.name)}
                            </p>
                            <img
                                src={getLogo(element.homeTeam.id, teams)}
                                alt="club logo"
                                className="club-logo"
                            ></img>
                            <p className={styles.score}>
                                {element.score.fullTime.homeTeam} -{' '}
                                {element.score.fullTime.awayTeam}
                            </p>
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
