import { useState, useContext } from 'react';

import { StoreContext } from '../../store';

import { StandingsExtraStats } from './StandingsExtraStats';

import { fixTeamName } from '../../utils.js';

import styles from '../../styles/Standings.module.css';

export const StandingsListItem = () => {
    const store = useContext(StoreContext);

    const { id, league: { standings } } = store.state;

    const [teamId, setTeamId] = useState(null);

    const onClickHandler = (id) =>
        teamId !== id ? setTeamId(id) : setTeamId(null);

    const renderExtraStats = (position) =>
        teamId === position.team.id ? true : false;

    const renderSelectedClass = (position) =>
        teamId === position.team.id ? styles.teamListSelected : '';

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
            {standings.map((position) => {
                return (
                    <li
                        className={styles.teamListItemContainer}
                        key={position.team.id}
                        onClick={() => onClickHandler(position.team.id)}
                    >
                        <div
                            className={`${
                                styles.teamListItem
                            } ${renderSelectedClass(position)}`}
                        >
                            <section className={styles.postionStats}>
                                <p>{position.position}</p>
                            </section>
                            <section className={styles.teamStats}>
                                <img
                                    src={position.team.crest}
                                    alt="Club Logo"
                                    className={styles.clubLogo}
                                ></img>
                                <p>{fixTeamName(id, position.team.name)}</p>
                            </section>
                            <section className={styles.gamesStats}>
                                <p>{position.playedGames}</p>
                                <p>{position.won}</p>
                                <p>{position.draw}</p>
                                <p>{position.lost}</p>
                            </section>
                            <section className={styles.goalsStats}>
                                <p>{position.goalsFor}</p>
                                <p>{position.goalsAgainst}</p>
                                <p>{position.goalDifference}</p>
                            </section>
                            <section className={styles.pointsStats}>
                                <p>{position.points}</p>
                            </section>
                        </div>
                        {renderExtraStats(position) && (
                            <StandingsExtraStats position={position} />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};
