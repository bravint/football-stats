import { useContext } from 'react';

import { MATCH_TYPES, MATCH_VENUE_TYPE } from '../../config';
import { StoreContext } from '../../store';
import { fixTeamName } from '../../utils.js';

import styles from '../../styles/Standings.module.css';

export const StandingsExtraStats = (props) => {
    const { position } = props;

    const store = useContext(StoreContext);

    const { id, league: { matches } } = store.state;

    const getTeamId = (match) => {
        if (position.team.id === match.awayTeam.id || position.team.id === match.homeTeam.id) {
            return position.team.id;
        }
    };

    const getLastSixMatches = () => {
        const selectedMatches = matches.filter((match) => position.team.id === getTeamId(match));
        const finishedMatches = selectedMatches.filter(({ status }) => status === MATCH_TYPES.FINISHED);
        const lastSixMatches = finishedMatches.slice(-6);
        return lastSixMatches.reverse();
    };

    const selectedMatches = getLastSixMatches();

    const isHomeFixture = (match) => match.homeTeam.id === position.team.id;

    const getFixtureLocation = (match) => isHomeFixture(match) ? MATCH_VENUE_TYPE.HOME : MATCH_VENUE_TYPE.AWAY;

    const findOppostionTeamName = (selectedMatch) => {
        if (selectedMatch.homeTeam.id === position.team.id) {
            return selectedMatch.awayTeam.name;
        } else {
            return selectedMatch.homeTeam.name;
        }
    };

    const renderMatchStatus = (match) => {
        const winner = match.score.winner;

        if ((winner === 'AWAY_TEAM' && !isHomeFixture(match)) || (winner === 'HOME_TEAM' && isHomeFixture(match))) {
            return styles.green;
        }

        if ((winner === 'AWAY_TEAM' && isHomeFixture(match)) || (winner === 'HOME_TEAM' && !isHomeFixture(match))) {
            return styles.red;
        }

        if (winner === 'DRAW') {
            return styles.orange;
        }
    };

    return (
        <ul className={styles.extraStats}>
            {selectedMatches.map((selectedMatch) => {
                return (
                    <li
                        key={selectedMatch.id}
                        className={styles.extraStatsContainer}
                    >
                        <div
                            className={`${renderMatchStatus(selectedMatch)}`}
                        >
                            &nbsp;
                        </div>
                        <section>
                            <p>
                                <strong>
                                    {selectedMatch.score.fullTime.home} -{' '}
                                    {selectedMatch.score.fullTime.away}
                                </strong>
                            </p>
                            <p>
                                {getFixtureLocation(selectedMatch)} vs{' '}
                                {fixTeamName(id, findOppostionTeamName(selectedMatch))}
                            </p>
                        </section>
                    </li>
                );
            })}
        </ul>
    );
};
