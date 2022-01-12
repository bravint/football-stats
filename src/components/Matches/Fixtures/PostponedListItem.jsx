import { useContext } from 'react';

import { StoreContext } from '../../../store';
import { fixTeamName, getLogo } from '../../../utils.js';

import styles from '../../../styles/FixturesListItem.module.css';

export const PostponedListItem = () => {
    const store = useContext(StoreContext);

    const postponedMatches = store.state.postponedMatches;
    const id = store.state.id;
    const teams = store.state.teams;

    return (
        <>
            {postponedMatches.map((element) => {
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
                            <p>P - P</p>
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
