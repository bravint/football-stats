import { useContext } from 'react';

import { StoreContext } from '../../../store';
import { fixTeamName, getLogo } from '../../../utils.js';

import styles from '../../../styles/Matches.module.css';

export const CancelledListItem = () => {
    const store = useContext(StoreContext);

    const { cancelledMatches, id, league: { teams } } = store.state;

    return (
        <>
            {cancelledMatches.map((match) => {
                return (
                    <li
                        className={styles.matchListItemContainer}
                        key={match.id}
                    >
                        <div className={styles.matchListItem}>
                            <p className={styles.homeTeam}>
                                {fixTeamName(id, match.homeTeam.name)}
                            </p>
                            <img
                                src={getLogo(match.homeTeam.id, teams)}
                                alt="club logo"
                                className={styles.clubLogo}
                            ></img>
                            <p className={styles.score}>C - C</p>
                            <img
                                src={getLogo(match.awayTeam.id, teams)}
                                alt="club logo"
                                className={styles.clubLogo}
                            ></img>
                            <p className={styles.awayTeam}>
                                {fixTeamName(id, match.awayTeam.name)}
                            </p>
                        </div>
                    </li>
                );
            })}
        </>
    );
};
