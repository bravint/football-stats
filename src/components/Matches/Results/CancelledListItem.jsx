import { useContext } from 'react';

import { StoreContext } from '../../../store';
import { fixTeamName, getLogo } from '../../../utils.js';

import styles from '../../../styles/Matches.module.css';

export const CancelledListItem = () => {
    const store = useContext(StoreContext);

    const { cancelledMatches, id, teams } = store.state;

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
                                className={styles.clubLogo}
                            ></img>
                            <p>C - C</p>
                            <img
                                src={getLogo(element.awayTeam.id, teams)}
                                alt="club logo"
                                className={styles.clubLogo}
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
