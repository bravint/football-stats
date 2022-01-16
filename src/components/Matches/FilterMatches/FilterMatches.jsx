/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';

import { MATCH_TYPES, URL, STORE_ACTIONS } from '../../../config';
import { StoreContext, initialState } from '../../../store';
import { fixTeamName, generateSortedArray } from '../../../utils';

import styles from '../../../styles/FilterMatches.module.css';

import CloseIcon from '@mui/icons-material/Close';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

export const FilterMatches = () => {
    const [displayFiltersForm, setDisplayFiltersForm] = useState(false);
    const [matchStatusList, setMatchStatusList] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [teamsList, setTeamsList] = useState([]);

    const store = useContext(StoreContext);

    const { id, matches, matchStatus, sortType, teams, url } = store.state;

    useEffect(() => {
        clearFilters();
        genMatchStatusArray();
        genTeamsArray();
    }, [url, id]);

    useEffect(() => {
        filteredMatchesArray();
    }, [selectedTeams, matchStatus, sortType, matchStatusList, teamsList]);

    const clearFilters = () => {
        setSelectedTeams([]);
        doDispatch(STORE_ACTIONS.MATCH_STATUS, initialState.matchStatus);
        doDispatch(STORE_ACTIONS.SORT_TYPE, initialState.sortType);
    };

    const doDispatch = (action, payload) => {
        store.dispatch({
            type: action,
            payload: payload,
        });
    };

    const checkFixturesStatus = (element) => {
        if (element.status !== MATCH_TYPES.FINISHED && element.status !== MATCH_TYPES.CANCELLED) return element;
    };

    const checkResultsStatus = (element) => {
        if (element.status === MATCH_TYPES.FINISHED || element.status === MATCH_TYPES.CANCELLED) return element;
    };

    const genMatchStatusArray = () => {
        let array = [];
        if (url === URL.RESULTS) array = matches.matches.filter((element) => checkResultsStatus(element));
        if (url === URL.FIXTURES) array = matches.matches.filter((element) => checkFixturesStatus(element));
        const newarray = array.map((element) => element.status);
        let status = Array.from(new Set(newarray));
        status.sort();
        setMatchStatusList(status);
    };

    const genTeamsArray = () => setTeamsList([...teams.teams]);

    const filterMatches = (element) => {
        if (filterByFixtureType(element) && filterByTeam(element)) return element;
    };

    const filterByFixtureType = (element) => {
        const elementStatus = element.status.toLowerCase();
        if (matchStatus.includes(elementStatus)) return true;
        if (url === URL.FIXTURES && matchStatus === initialState.matchStatus && (element.status !== MATCH_TYPES.FINISHED || element.status !== MATCH_TYPES.CANCELLED)) return true;
        if (url === URL.RESULTS && matchStatus === initialState.matchStatus && (element.status === MATCH_TYPES.FINISHED || element.status === MATCH_TYPES.CANCELLED)) return true;
    };

    //add filter for live game, IN_PLAY

    const filterByTeam = (element) => {
        const homeTeam = fixTeamName(id, element.homeTeam.name);
        const awayTeam = fixTeamName(id, element.awayTeam.name);
        if (selectedTeams.includes(homeTeam) || selectedTeams.includes(awayTeam) || selectedTeams.length < 1) return true;
    };

    const filteredMatchesArray = () => {
        let filteredArray = matches.matches.filter((element) => filterMatches(element));
        if (url === URL.FIXTURES) {
            const postponedMatches = filteredArray.filter((element) => element.status === MATCH_TYPES.POSTPONED);
            doDispatch(STORE_ACTIONS.POSTPONED_MATCHES, postponedMatches);
            const scheduledMatches = filteredArray.filter((element) => element.status === MATCH_TYPES.SCHEDULED);
            sortFilteredArray(scheduledMatches);
        }
        if (url === URL.RESULTS) {
            const cancelledMatches = filteredArray.filter((element) => element.status === MATCH_TYPES.CANCELLED)
            doDispatch(STORE_ACTIONS.CANCELLED_MATCHES, cancelledMatches);
            let finishedMatches = filteredArray.filter((element) => element.status === MATCH_TYPES.FINISHED);
            sortFilteredArray(finishedMatches.reverse());
        }
    };

    const sortFilteredArray = (inputArray) => {
        if (inputArray.length < 1) return;
        let unsortedArray = [...inputArray];
        let sortedArray = [];
        generateSortedArray(unsortedArray, sortedArray, sortType);
        if(url === URL.FIXTURES) doDispatch(STORE_ACTIONS.FILTERED_FIXTURES, sortedArray);
        if(url === URL.RESULTS) doDispatch(STORE_ACTIONS.FILTERED_RESULTS, sortedArray);
    };

    const checkChecked = (element) => selectedTeams.includes(element) ? true : false;

    const capitalisedTitle = (element) => element.replace(/\b\w/g, (l) => l.toUpperCase());

    const handleFixtureTypeChange = (event) => doDispatch(STORE_ACTIONS.MATCH_STATUS, event.target.value);

    const handleTeamSelectionChange = (event) => selectedTeams.includes(event.target.id) ? setSelectedTeams(selectedTeams.filter((element) => element !== event.target.id)) : setSelectedTeams([...selectedTeams, event.target.id]);

    const handleSortChange = (event) => doDispatch(STORE_ACTIONS.SORT_TYPE, event.target.value.toLowerCase());

    const HandleShowFIlterClick = () => setDisplayFiltersForm(!displayFiltersForm);

    const displayFilteredTeamsList = () => selectedTeams.length > 0 ? selectedTeams.join(', ') : 'all teams'

    return (
        <div className={styles.filterSection}>
            <div className={styles.blankSpace}>&nbsp;</div>
            <div className={styles.filterSummary}>
                <div
                    className={styles.showFormButton}
                    onClick={() => HandleShowFIlterClick()}
                >
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
                        <div
                            className={styles.close}
                            onClick={() => HandleShowFIlterClick()}
                        >
                            <CloseIcon className={styles.closeIcon} />
                        </div>
                        <div className={styles.formSelectContainer}>
                            <div>
                                <h3>Show Matches</h3>
                                <select
                                    id="type"
                                    name="type"
                                    className=""
                                    value={matchStatus}
                                    onChange={(event) =>
                                        handleFixtureTypeChange(event)
                                    }
                                >
                                    {matchStatusList.length > 1 && (
                                        <option value="all">Show All</option>
                                    )}
                                    {matchStatusList.map((element) => {
                                        return (
                                            <option
                                                value={element.toLowerCase()}
                                            >
                                                {capitalisedTitle(
                                                    element.toLowerCase()
                                                )}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div>
                                <h3>Sort Match List by</h3>
                                <select
                                    id="league"
                                    name="league"
                                    className=""
                                    value={capitalisedTitle(sortType)}
                                    onChange={(event) =>
                                        handleSortChange(event)
                                    }
                                >
                                    <option value="Date">Date</option>
                                    <option value="Matchday">Matchday</option>
                                </select>
                            </div>
                            <div>&nbsp;</div>
                        </div>
                        <h3>Filter by Team</h3>
                        <section className={styles.selectteam}>
                            {teamsList.map((element) => {
                                return (
                                    <div className={styles.teamSelect}>
                                        <input
                                            type="checkbox"
                                            id={fixTeamName(id, element.name)}
                                            checked={checkChecked(
                                                fixTeamName(id, element.name)
                                            )}
                                            name={fixTeamName(id, element.name)}
                                            onChange={(event) =>
                                                handleTeamSelectionChange(event)
                                            }
                                        />
                                        <label htmlFor={element.id}>
                                            {fixTeamName(id, element.name)}
                                        </label>
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
