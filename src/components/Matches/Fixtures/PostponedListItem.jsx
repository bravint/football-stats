import { useContext } from 'react';

import { StoreContext } from '../../../store';
import { fixTeamName, getLogo } from '../../../utils.js';

import styles from '../../../styles/Matches.module.css';

export const PostponedListItem = () => {
    const store = useContext(StoreContext);

    const { postponedMatches, id, teams } = store.state;

    return (
        <>
            {postponedMatches.map((element) => {
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
                                alt="club logo"
                                className={styles.clubLogo}
                            ></img>
                            <p className={styles.score}>P - P</p>
                            <img
                                src={getLogo(element.awayTeam.id, teams)}
                                alt="club logo"
                                className={styles.clubLogo}
                            ></img>
                            <p className={styles.awayTeam}>
                                {fixTeamName(id, element.awayTeam.name)}
                            </p>
                        </div>
                    </li>
                );
            })}
        </>
    );
};
