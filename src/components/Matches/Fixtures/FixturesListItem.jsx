import {
    getDate,
    getTime,
    fixTeamName,
    getLogo,
} from '../../../utils.js';

import styles from '../../../styles/FixturesListItem.module.css';

export const FixturesListItem = (props) => {
    const { nested, teams, id } = props;

    return (
        <>
            <h3 className={styles.title}>{getDate(nested[0].utcDate)}</h3>
            {nested.map((element, index) => {
                return (
                    <>
                    <li className={styles.matchList} key={element.id}>
                        <section className={styles.matchDetails} tabIndex={index}>
                            <p className={styles.homeTeam}>
                                {fixTeamName(id, element.homeTeam.name)}
                            </p>
                            <img
                                src={getLogo(element.homeTeam.id, teams)}
                                alt="club logo"
                                className="club-logo"
                            ></img>
                            <p>{getTime(element.utcDate)}</p>
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
                    </>
                );
            })}
        </>
    );
};