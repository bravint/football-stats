/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';

import { MATCH_TYPES, URL, SORT_TYPE, STORE_ACTIONS } from '../../../config';
import { StoreContext, initialState } from '../../../store';
import { fixTeamName, formatDate } from '../../../utils';

import styles from '../../../styles/FilterMatches.module.css';

import CloseIcon from '@mui/icons-material/Close';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

const completedMatchStatuses = [MATCH_TYPES.FINISHED, MATCH_TYPES.CANCELLED];

export const FilterMatches = () => {
    const [displayFiltersForm, setDisplayFiltersForm] = useState(false);
    const [matchStatusList, setMatchStatusList] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [teamsList, setTeamsList] = useState([]);

    const store = useContext(StoreContext);

    const { id, matches, matchStatus, sortType, teams, url } = store.state;

    useEffect(() => {
        clearFilters();
        generateListOfMatchStatuses();
        generateListOfTeams();
    }, [url, id]);

    useEffect(() => {
        filterMatches();
    }, [selectedTeams, matchStatus, sortType, matchStatusList, teamsList]);

    const clearFilters = () => {
        setSelectedTeams([]);

        handleDispatch(STORE_ACTIONS.MATCH_STATUS, initialState.matchStatus);

        handleDispatch(STORE_ACTIONS.SORT_TYPE, initialState.sortType);
    };

    const handleDispatch = (action, payload) => {
        store.dispatch({
            type: action,
            payload: payload,
        });
    };

    console.log({ matchStatusList })

    const generateListOfTeams = () => setTeamsList([...teams.teams]);

    const checkFixturesStatus = (status) => {
        if (!completedMatchStatuses.includes(status)) {
            return status;
        }
    };

    const generateListOfMatchStatuses = () => {
        if (url === URL.RESULTS) {
            const statuses = completedMatchStatuses.map((status) => status.toLowerCase());
            statuses.sort();

            return setMatchStatusList(statuses);
        }

        if (url === URL.FIXTURES) {
            const statuses = matches.matches
                .filter(({ status }) => checkFixturesStatus(status))
                .map(({ status }) => status.toLowerCase());
            
            const uniqueStatuses = Array.from(new Set(statuses)); 
            uniqueStatuses.sort();

            setMatchStatusList(uniqueStatuses);
        };
    };

    const filterByMatchStatus = (match) => {
        if (matchStatus.includes(match.status.toLowerCase())) {
            return true;
        }

        if (
            url === URL.FIXTURES &&
            matchStatus === initialState.matchStatus &&
            !completedMatchStatuses.includes(match.status)
        ) {
            return true;
        }
            
        if (
            url === URL.RESULTS &&
            matchStatus === initialState.matchStatus &&
            completedMatchStatuses.includes(match.status)
        ) {
            return true;
        }
    };

    const filterByTeams = (match) => {
        const homeTeam = fixTeamName(id, match.homeTeam.name);
        const awayTeam = fixTeamName(id, match.awayTeam.name);

        if (selectedTeams.includes(homeTeam) || selectedTeams.includes(awayTeam) || !selectedTeams.length) {
            return true
        };
    };

    const filterMatchesByStatusAndTeams = (match) => {
        if (filterByMatchStatus(match) && filterByTeams(match)) {
            return match
        };
    };

    const filterMatches = () => {
        let filteredMatches = matches.matches.filter((match) => filterMatchesByStatusAndTeams(match));

        if (url === URL.FIXTURES) {
            const postponedMatches = filteredMatches.filter(({ status }) => status === MATCH_TYPES.POSTPONED);

            handleDispatch(STORE_ACTIONS.POSTPONED_MATCHES, postponedMatches);

            const scheduledMatches = filteredMatches.filter(({ status }) => [MATCH_TYPES.SCHEDULED, MATCH_TYPES.TIMED].includes(status));

            sortMatches(scheduledMatches);
        }

        if (url === URL.RESULTS) {
            const cancelledMatches = filteredMatches.filter(({ status }) => status === MATCH_TYPES.CANCELLED);

            handleDispatch(STORE_ACTIONS.CANCELLED_MATCHES, cancelledMatches);

            const completedMatches = filteredMatches.filter(({ status }) => status === MATCH_TYPES.FINISHED);

            sortMatches(completedMatches.reverse());
        }
    };

    const sortByMatchday = (matches) => matches.sort((a, b) => a[0].matchday - b[0].matchday);

    const sortMatchesByDate = (unsortedMatches, sortedMatches) => {
        if (!unsortedMatches.length) {
            return
        };

        const dateForFirstMatchInList = formatDate(unsortedMatches[0].utcDate);
        const matchesForDate = unsortedMatches.filter(({ utcDate }) => formatDate(utcDate) === dateForFirstMatchInList);
        sortedMatches.push(matchesForDate);
        const remainingUnsortedMatches = unsortedMatches.filter(({ utcDate }) => formatDate(utcDate) !== dateForFirstMatchInList);

        sortMatchesByDate(remainingUnsortedMatches, sortedMatches);
    };

    const sortMatchesByMatchday = (unsortedMatches, sortedMatches) => {
        if (!unsortedMatches.length) {
            return sortByMatchday(sortedMatches);
        };

        const firstMatchdayInList = unsortedMatches[0].matchday;
        const matchesForMatchday = unsortedMatches.filter(({ matchday }) => matchday === firstMatchdayInList);
        sortedMatches.push(matchesForMatchday);
        const remainingUnsortedMatches = unsortedMatches.filter(({ matchday }) => matchday !== firstMatchdayInList);

        sortMatchesByMatchday(remainingUnsortedMatches, sortedMatches);
    };

    const sortMatches = (matches) => {
        if (!matches.length) {
            return
        };

        const sortedMatches = [];

        if (sortType === SORT_TYPE.DATE) {
            sortMatchesByDate(matches, sortedMatches)
        };

        if (sortType === SORT_TYPE.MATCHDAY) {
            sortMatchesByMatchday(matches, sortedMatches)
        };

        if (url === URL.FIXTURES) {
            handleDispatch(STORE_ACTIONS.FILTERED_FIXTURES, sortedMatches)
        };

        if (url === URL.RESULTS) {
            handleDispatch(STORE_ACTIONS.FILTERED_RESULTS, sortedMatches)
        };
    };

    const checkSelectedTeam = (team) => (selectedTeams.includes(team) ? true : false);

    const capitaliseTitle = (title) => title.replace(/\b\w/g, (l) => l.toUpperCase());

    const handleFixtureTypeChange = (event) => handleDispatch(STORE_ACTIONS.MATCH_STATUS, event.target.value);

    const handleTeamSelectionChange = (event) =>
        selectedTeams.includes(event.target.id)
            ? setSelectedTeams(selectedTeams.filter((element) => element !== event.target.id))
            : setSelectedTeams([...selectedTeams, event.target.id]);

    const handleSortChange = (event) => handleDispatch(STORE_ACTIONS.SORT_TYPE, event.target.value.toLowerCase());

    const HandleShowFilterClick = () => setDisplayFiltersForm(!displayFiltersForm);

    const displayFilteredTeamsList = () => (selectedTeams.length ? selectedTeams.join(', ') : 'all teams');

    return (
        <div className={styles.filterSection}>
            <div className={styles.blankSpace}>&nbsp;</div>
            <div className={styles.filterSummary}>
                <div className={styles.showFormButton} onClick={() => HandleShowFilterClick()}>
                    <TuneRoundedIcon className={styles.TuneRoundedIcon} />
                    <p>Filters</p>
                </div>
                <p className={styles.showActiveFilters}>
                    <strong>Active Filters:</strong> Show {matchStatus} matches, matches sorted by {sortType} for {displayFilteredTeamsList()}
                </p>
            </div>

            {displayFiltersForm && (
                <>
                    <div className={styles.blankSpace}>&nbsp;</div>
                    <form className={styles.form}>
                        <div className={styles.close} onClick={() => HandleShowFilterClick()}>
                            <CloseIcon className={styles.closeIcon} />
                        </div>
                        <div className={styles.formSelectContainer}>
                            <div>
                                <h3>Show Matches</h3>
                                <select id="type" name="type" className="" value={matchStatus} onChange={(event) => handleFixtureTypeChange(event)}>
                                    {matchStatusList.length && <option value="all">Show All</option>}
                                    {matchStatusList.map((status) => {
                                        return <option value={status.toLowerCase()}>{capitaliseTitle(status.toLowerCase())}</option>;
                                    })}
                                </select>
                            </div>
                            <div>
                                <h3>Sort Match List by</h3>
                                <select id="league" name="league" className="" value={capitaliseTitle(sortType)} onChange={(event) => handleSortChange(event)}>
                                    <option value="Date">Date</option>
                                    <option value="Matchday">Matchday</option>
                                </select>
                            </div>
                            <div>&nbsp;</div>
                        </div>
                        <h3>Filter by Team</h3>
                        <section className={styles.selectteam}>
                            {teamsList.map((team) => {
                                return (
                                    <div className={styles.teamSelect}>
                                        <input
                                            type="checkbox"
                                            id={fixTeamName(id, team.name)}
                                            checked={checkSelectedTeam(fixTeamName(id, team.name))}
                                            name={fixTeamName(id, team.name)}
                                            onChange={(event) => handleTeamSelectionChange(event)}
                                        />
                                        <label htmlFor={team.id}>{fixTeamName(id, team.name)}</label>
                                    </div>
                                );
                            })}
                        </section>
                    </form>
                    <div className={styles.blankSpace}>&nbsp;</div>
                </>
            )}
        </div>
    );
};
