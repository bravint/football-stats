import { useState, useContext } from 'react';

import { StoreContext } from '../../store';

import { StandingsExtraStats } from './StandingsExtraStats';

import { fixTeamName } from '../../utils.js';

import styles from '../../styles/Standings.module.css';

export const StandingsListItem = () => {
    const store = useContext(StoreContext);

    const { id, standings } = store.state;

    const [teamId, setTeamId] = useState(null);

    const onClickHandler = (id) => (teamId !== id ? setTeamId(id) : setTeamId(null));

    const renderExtraStats = (element) => (teamId === element.team.id ? true : false);

    const renderSelectedClass = (element) => (teamId === element.team.id ? styles.teamListSelected : '');

    return (
        <ul>
            <li className={`${styles.teamListItemHeading} ${styles.listTitle}`}>
                <section className={styles.postionStats}>
                    <p></p>
                </section>
                <section className={styles.teamStats}>
                    <p></p>
                    <p>Team name</p>
                </section>
                <section className={styles.gamesStats}>
                    <p>P</p>
                    <p>W</p>
                    <p>D</p>
                    <p>L</p>
                </section>
                <section className={styles.goalsStats}>
                    <p>F</p>
                    <p>A</p>
                    <p>GD</p>
                </section>
                <section className={styles.pointsStats}>
                    <p>Pts</p>
                </section>
            </li>
            {standings.standings[0].table.map((element) => {
                return (
                    <li className={styles.teamListItemContainer} key={element.team.id} onClick={() => onClickHandler(element.team.id)}>
                        <div className={`${styles.teamListItem} ${renderSelectedClass(element)}`}>
                            <section className={styles.postionStats}>
                                <p>{element.position}</p>
                            </section>
                            <section className={styles.teamStats}>
                                <img src={element.team.crestUrl} alt="Club Logo" className={styles.clubLogo}></img>
                                <p>{fixTeamName(id, element.team.name)}</p>
                            </section>
                            <section className={styles.gamesStats}>
                                <p>{element.playedGames}</p>
                                <p>{element.won}</p>
                                <p>{element.draw}</p>
                                <p>{element.lost}</p>
                            </section>
                            <section className={styles.goalsStats}>
                                <p>{element.goalsFor}</p>
                                <p>{element.goalsAgainst}</p>
                                <p>{element.goalDifference}</p>
                            </section>
                            <section className={styles.pointsStats}>
                                <p>{element.points}</p>
                            </section>
                        </div>
                        {renderExtraStats(element) && <StandingsExtraStats element={element} />}
                    </li>
                );
            })}
        </ul>
    );
};
