import { getDate, getLogo, fixTeamName, getMatchDay } from '../../../utils.js';

import styles from '../../../styles/FixturesListItem.module.css';

export const ResultsListItem = (props) => {
    const { nested, id, teams, sortType } = props;

    const renderTitle = (sortType) => {
        if (sortType === 'date') return getDate(nested[0].utcDate);
        if (sortType === 'matchday') return 'Matchday ' + getMatchDay(nested[0]);
    };

    return (
        <>
            <h3 className={styles.title}>{renderTitle(sortType)}</h3>
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
