/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext  } from 'react';

import { fixTeamName, generateSortedArray } from '../../../utils.js';
import { StoreContext } from "../../../store";

import styles from '../../../styles/FilterMatches.module.css';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import CloseIcon from '@mui/icons-material/Close';

export const FilterMatches = (props) => {
    const {
        matches,
        teams,
        id,
        url,
    } = props;

    const [matchStatusList, setMatchStatusList] = useState([]);
    const [teamsList, setTeamsList] = useState([]);
    const [displayFiltersForm, setDisplayFiltersForm] = useState(false);
    const [selectedTeams, setSelectedTeams] = useState([]);

    const store = useContext(StoreContext);
    
    const matchStatus = store.state.matchStatus;
    const sortType = store.state.sortType;
    const filteredMatches = store.state.filteredMatches;
    const cancelledMatches = store.state.cancelledMatches;
    const postponedMatches = store.state.postponedMatches;

    console.log (`globlaStates`, {
        matchStatus,
        sortType,
        filteredMatches,
        cancelledMatches,
        postponedMatches
    })

    useEffect(() => {
        clearFilters()
        genMatchStatusArray();
        genTeamsArray();
    }, [matches, teams, url, id]);

    useEffect(() => {
        filteredMatchesArray();
    }, [selectedTeams, matchStatus, sortType, matchStatusList, teamsList]);

    const clearFilters = () => {
        setSelectedTeams([]);
        doDispatch("update/matchStatus", 'all')
        doDispatch("update/sortType", 'date')
    };

    const doDispatch  = (action, payload) => {
        store.dispatch({
            type: action,
            payload: payload
          })
    }

    const checkFixturesStatus = (element) => {
        if (element.status !== 'FINISHED' && element.status !== 'CANCELLED') return element;
    };

    const checkResultsStatus = (element) => {
        if (element.status === 'FINISHED' || element.status === 'CANCELLED') return element;
    };

    const genMatchStatusArray = () => {
        let array = [];
        if (url === '/results') array = matches.matches.filter((element) => checkResultsStatus(element));
        if (url === '/fixtures') array = matches.matches.filter((element) => checkFixturesStatus(element));
        const newarray = array.map((element) => element.status);
        let status = Array.from(new Set(newarray));
        status.sort()
        setMatchStatusList(status);
    };

    const genTeamsArray = () => setTeamsList([...teams.teams]);

    const filterMatches = (element) => {
        if (filterByFixtureType(element) && filterByTeam(element)) return element;
    };

    const filteredMatchesArray = () => {
        let filteredArray = matches.matches.filter((element) => filterMatches(element));
        if (url === '/fixtures') {
            doDispatch('update/postponedMatches', (filteredArray.filter((element) => element.status === 'POSTPONED')))
            sortFilteredArray(filteredArray.filter((element) => element.status === 'SCHEDULED'));
        }
        if (url === '/results')  doDispatch('update/cancelledMatches', (filteredArray.filter((element) => element.status === 'CANCELLED')));
            let finishedMatchesArray = filteredArray.filter((element) => element.status === 'FINISHED');
            sortFilteredArray(finishedMatchesArray.reverse());
        
    };

    const filterByFixtureType = (element) => {
        const elementStatus = element.status.toLowerCase();
        if (matchStatus.includes(elementStatus)) return true;
        if (url === '/fixtures' && matchStatus === 'all' && (element.status !== 'FINISHED' || element.status !== 'CANCELLED')) return true;
        if (url === '/results' && matchStatus === 'all' && (element.status === 'FINISHED' || element.status === 'CANCELLED')) return true;
    };

    const filterByTeam = (element) => {
        const homeTeam = fixTeamName(id, element.homeTeam.name);
        const awayTeam = fixTeamName(id, element.awayTeam.name);
        if (selectedTeams.includes(homeTeam) || selectedTeams.includes(awayTeam) || selectedTeams.length < 1) return true;
    };

    const sortFilteredArray = (inputArray) => {
        if (inputArray.length < 1) return;
        let unsortedArray = [...inputArray];
        let sortedArray = [];
        generateSortedArray(unsortedArray, sortedArray, sortType);
        doDispatch("update/filteredMatches", sortedArray);
    };

    const checkChecked = (element) => selectedTeams.includes(element) ? true : false;

    const capitalisedTitle = (element) => element.replace(/\b\w/g, (l) => l.toUpperCase());

    const handleFixtureTypeChange = (event) => doDispatch('update/matchStatus', event.target.value)

    const handleTeamSelectionChange = (event) => selectedTeams.includes(event.target.id) ? 
    setSelectedTeams(selectedTeams.filter((element) => element !== event.target.id)) : setSelectedTeams([...selectedTeams, event.target.id]);

    const handleSortChange = (event) => doDispatch('update/sortType', event.target.value.toLowerCase());

    const HandleShowFIlterClick = () => setDisplayFiltersForm(!displayFiltersForm);

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
                    <strong>Active Filters:</strong> Show {matchStatus} matches,
                    matches sorted by {sortType}
                </p>
            </div>

            {displayFiltersForm && (
                <>
                    <div className={styles.blankSpace}>&nbsp;</div>
                    <form className={styles.form}>
                    <div className={styles.close} onClick={() => HandleShowFIlterClick()}><CloseIcon className={styles.closeIcon}/></div>  
                        <div className={styles.formSelectContainer}>
                            <div>
                                <h3>Show Matches</h3>
                                <select
                                    id="type"
                                    name="type"
                                    className=""
                                    value={matchStatus}
                                    onChange={(event) =>handleFixtureTypeChange(event)}
                                >
                                    {matchStatusList.length > 1 && (
                                        <option value="all">Show All</option>
                                    )}
                                    {matchStatusList.map((element) => {
                                        return (
                                            <option value={element.toLowerCase()}>
                                                {capitalisedTitle(element.toLowerCase())}
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
                                    onChange={(event) =>handleSortChange(event)}
                                >
                                    <option value="Date">Date</option>
                                    <option value="Matchday">Matchday</option>
                                </select>
                            </div>   
                        </div>
                        <h3>Filter by Team</h3>
                        <section className={styles.selectteam}>
                            {teamsList.map((element) => {
                                return (
                                    <div className={styles.teamSelect}>
                                        <input
                                            type="checkbox"
                                            id={fixTeamName(id, element.name)}
                                            checked={checkChecked(fixTeamName(id, element.name))}
                                            name={fixTeamName(id, element.name)}
                                            onChange={(event) => handleTeamSelectionChange(event)}
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
