import { useContext } from 'react';

import { StoreContext } from '../../../store';

import { fixTeamName, getLogo, getTime, renderTitle } from '../../../utils.js';

import styles from '../../../styles/Matches.module.css';

export const FixturesListItem = (props) => {
    const { fixtures } = props;

    const store = useContext(StoreContext);

    const { id, sortType, league: { teams } } = store.state;

    return (
        <ul>
            <h3 className={styles.title}>{renderTitle(sortType, fixtures)}</h3>
            {fixtures.map((fixture) => {
                return (
                    <li
                        className={styles.matchListItemContainer}
                        key={fixture.id}
                    >
                        <div className={styles.matchListItem}>
                            <p className={styles.homeTeam}>
                                {fixTeamName(id, fixture.homeTeam.name)}
                            </p>
                            <img
                                src={getLogo(fixture.homeTeam.id, teams)}
                                alt="Club Logo"
                                className={styles.clubLogo}
                            ></img>
                            <p className={styles.score}>
                                {getTime(fixture.utcDate)}
                            </p>
                            <img
                                src={getLogo(fixture.awayTeam.id, teams)}
                                alt="Club Logo"
                                className={styles.clubLogo}
                            ></img>
                            <p className={styles.awayTeam}>
                                {fixTeamName(id, fixture.awayTeam.name)}
                            </p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
