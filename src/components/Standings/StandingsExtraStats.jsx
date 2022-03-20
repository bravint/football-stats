import { useContext } from 'react';

import { MATCH_TYPES, MATCH_VENUE_TYPE } from '../../config';
import { StoreContext } from '../../store';
import { fixTeamName } from '../../utils.js';

import styles from '../../styles/Standings.module.css';

export const StandingsExtraStats = (props) => {
    const { element } = props;

    const store = useContext(StoreContext);

    const { matches, id } = store.state;

    const getTeamId = (match) => {
        if (element.team.id === match.awayTeam.id || element.team.id === match.homeTeam.id) return element.team.id;
    };

    const getLastFiveMatches = () => {
        let selectedMatches = matches.matches.filter((match) => element.team.id === getTeamId(match));

        selectedMatches = selectedMatches.filter((selectedMatch) => selectedMatch.status === MATCH_TYPES.FINISHED);

        selectedMatches = selectedMatches.slice(-5);
        
        return selectedMatches.reverse();
    };

    const selectedMatches = getLastFiveMatches();

    const findFixtureLocation = (selectedMatch) => (selectedMatch.homeTeam.id === element.team.id ? MATCH_VENUE_TYPE.HOME : MATCH_VENUE_TYPE.AWAY);

    const findOppostionTeamName = (selectedMatch) =>
        selectedMatch.homeTeam.id === element.team.id ? selectedMatch.awayTeam.name : selectedMatch.homeTeam.name;

    const renderMatchStatus = (selectedMatch) => {
        if (selectedMatch.score.winner === 'AWAY_TEAM' && findFixtureLocation(selectedMatch) === MATCH_VENUE_TYPE.AWAY) return styles.green;
        if (selectedMatch.score.winner === 'HOME_TEAM' && findFixtureLocation(selectedMatch) === MATCH_VENUE_TYPE.HOME) return styles.green;
        if (selectedMatch.score.winner === 'AWAY_TEAM' && findFixtureLocation(selectedMatch) === MATCH_VENUE_TYPE.HOME) return styles.red;
        if (selectedMatch.score.winner === 'HOME_TEAM' && findFixtureLocation(selectedMatch) === MATCH_VENUE_TYPE.AWAY) return styles.red;
        if (selectedMatch.score.winner === 'DRAW') return '';
    };

    const renderMatchStatusDrawn = (selectedMatch) => (selectedMatch.score.winner === 'DRAW' ? styles.orange : '');

    return (
        <>
            <ul className={styles.extraStats}>
                {selectedMatches.map((selectedMatch) => {
                    return (
                        <li key={selectedMatch.id} className={styles.extraStatsContainer}>
                            <div className={`${renderMatchStatus(selectedMatch)} ${renderMatchStatusDrawn(selectedMatch)}`}>&nbsp;</div>
                            <section>
                                <p>
                                    <strong>
                                        {selectedMatch.score.fullTime.homeTeam} - {selectedMatch.score.fullTime.awayTeam}
                                    </strong>
                                </p>
                                <p>
                                    {findFixtureLocation(selectedMatch)} vs {fixTeamName(id, findOppostionTeamName(selectedMatch))}
                                </p>
                            </section>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
