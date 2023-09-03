import { useContext } from 'react';

import { MATCH_TYPES, MATCH_VENUE_TYPE } from '../../config';
import { StoreContext } from '../../store';
import { fixTeamName } from '../../utils.js';

import styles from '../../styles/Standings.module.css';

export const StandingsExtraStats = (props) => {
    const { position } = props;

    const store = useContext(StoreContext);

    const { league: { matches }, id } = store.state;

    const getTeamId = (match) => {
        if (
            position.team.id === match.awayTeam.id ||
            position.team.id === match.homeTeam.id
        )
            return position.team.id;
    };

    const getLastFiveMatches = () => {
        let selectedMatches = matches.filter(
            (match) => position.team.id === getTeamId(match)
        );

        selectedMatches = selectedMatches.filter(
            ({ status }) => status === MATCH_TYPES.FINISHED
        );

        selectedMatches = selectedMatches.slice(-5);

        return selectedMatches.reverse();
    };

    const selectedMatches = getLastFiveMatches();

    const findFixtureLocation = (selectedMatch) =>
        selectedMatch.homeTeam.id === position.team.id
            ? MATCH_VENUE_TYPE.HOME
            : MATCH_VENUE_TYPE.AWAY;

    const findOppostionTeamName = (selectedMatch) =>
        selectedMatch.homeTeam.id === position.team.id
            ? selectedMatch.awayTeam.name
            : selectedMatch.homeTeam.name;

    const renderMatchStatus = (selectedMatch) => {
        if (
            selectedMatch.score.winner === 'AWAY_TEAM' &&
            findFixtureLocation(selectedMatch) === MATCH_VENUE_TYPE.AWAY
        )
            return styles.green;
        if (
            selectedMatch.score.winner === 'HOME_TEAM' &&
            findFixtureLocation(selectedMatch) === MATCH_VENUE_TYPE.HOME
        )
            return styles.green;
        if (
            selectedMatch.score.winner === 'AWAY_TEAM' &&
            findFixtureLocation(selectedMatch) === MATCH_VENUE_TYPE.HOME
        )
            return styles.red;
        if (
            selectedMatch.score.winner === 'HOME_TEAM' &&
            findFixtureLocation(selectedMatch) === MATCH_VENUE_TYPE.AWAY
        )
            return styles.red;
        if (selectedMatch.score.winner === 'DRAW') return '';
    };

    const renderMatchStatusDrawn = (selectedMatch) =>
        selectedMatch.score.winner === 'DRAW' ? styles.orange : '';

    return (
        <>
            <ul className={styles.extraStats}>
                {selectedMatches.map((selectedMatch) => {
                    return (
                        <li
                            key={selectedMatch.id}
                            className={styles.extraStatsContainer}
                        >
                            <div
                                className={`${renderMatchStatus(
                                    selectedMatch
                                )} ${renderMatchStatusDrawn(selectedMatch)}`}
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
                                    {findFixtureLocation(selectedMatch)} vs{' '}
                                    {fixTeamName(
                                        id,
                                        findOppostionTeamName(selectedMatch)
                                    )}
                                </p>
                            </section>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
