import { useContext } from 'react';

import { StoreContext } from '../../../store';

import { fixTeamName, getLogo, getTime, renderTitle } from '../../../utils.js';

import styles from '../../../styles/Matches.module.css';

export const FixturesListItem = (props) => {
    const { nested } = props;

    const store = useContext(StoreContext);

    const { id, sortType, teams } = store.state;

    return (
        <ul>
            <h3 className={styles.title}>{renderTitle(sortType, nested)}</h3>
            {nested.map((element) => {
                return (
                    <li
                        className={styles.matchListItemContainer}
                        key={element.id}
                    >
                        <div className={styles.matchListItem}>
                            <p className={styles.homeTeam}>
                                {fixTeamName(id, element.homeTeam.name)}
                            </p>
                            <img
                                src={getLogo(element.homeTeam.id, teams)}
                                alt="Club Logo"
                                className={styles.clubLogo}
                            ></img>
                            <p className={styles.score}>
                                {getTime(element.utcDate)}
                            </p>
                            <img
                                src={getLogo(element.awayTeam.id, teams)}
                                alt="Club Logo"
                                className={styles.clubLogo}
                            ></img>
                            <p className={styles.awayTeam}>
                                {fixTeamName(id, element.awayTeam.name)}
                            </p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
