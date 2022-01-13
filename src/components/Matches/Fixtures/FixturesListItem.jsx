import { useContext } from 'react';

import { StoreContext } from '../../../store';

import { fixTeamName, getLogo, getTime, renderTitle } from '../../../utils.js';

import styles from '../../../styles/FixturesListItem.module.css';

export const FixturesListItem = (props) => {
    const { nested } = props;

    const store = useContext(StoreContext);

    const { id, sortType, teams } = store.state;

    return (
        <ul>
            <h3 className={styles.title}>{renderTitle(sortType, nested)}</h3>
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
                                alt="Club Logo"
                                className="club-logo"
                            ></img>
                            <p>{getTime(element.utcDate)}</p>
                            <img
                                src={getLogo(element.awayTeam.id, teams)}
                                alt="Club Logo"
                                className="club-logo"
                            ></img>
                            <p className={styles.awayTeam}>
                                {fixTeamName(id, element.awayTeam.name)}
                            </p>
                        </section>
                    </li>
                );
            })}
        </ul>
    );
};
