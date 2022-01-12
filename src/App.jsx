/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Home } from './components/Home/Home';
import { FilterMatches } from './components/Matches/FilterMatches/FilterMatches';
import { Fixtures } from './components/Matches/Fixtures/Fixtures';
import { Results } from './components/Matches/Results/Results';
import { ReturnToTopButton } from './components/ReturnToTopButton/ReturnToTopButton';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Standings } from './components/Standings/Standings';

import { API, API_ENDPOINT, MATCH_TYPES, URL } from './config';

import styles from './styles/App.module.css';

export const App = () => {
    const [id, setId] = useState(null);
    const [standings, setStandings] = useState({});
    const [matches, setMatches] = useState({});
    const [teams, setTeams] = useState({});
    const [url, setUrl] = useState('');

    const [updateData, setUpdateData] = useState(false)

    const [filteredMatches, setFilteredMatches] = useState([]);
    const [postponedMatches, setPostponedMatches] = useState([]);
    const [cancelledMatches, setCancelledMatches] = useState([]);
    const [matchStatus, setMatchStatus] = useState('all');
    const [sortType, setSortType] = useState('date');

    console.log(`states`, {
        standings,
        matches,
        teams,
        id,
        url,
        filteredMatches,
        postponedMatches,
        cancelledMatches,
        updateData
    });
    
    const location = useLocation();

    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    useEffect(() => {
        if (!id) return;

        const fetchLocalData = async (APIurl, endpoint, setState) => {
            try {
                const response = await fetch(`${APIurl}/${id}/${endpoint}`,fetchConfig());
                const data = await response.json();
                setState(data);
            } catch (error) {
                console.log(`error: `, error);
            }
        };

        fetchLocalData(API.INT_URL, API_ENDPOINT.STANDINGS, setStandings);
        fetchLocalData(API.INT_URL, API_ENDPOINT.MATCHES, setMatches);
        fetchLocalData(API.INT_URL, API_ENDPOINT.TEAMS, setTeams);
    }, [id]);

    useEffect(() => {
        if (!standings.standings) return;

        if ((standings.date - getTodaysDate()) < 1 || (!standings.date)) setUpdateData(true);
    }, [standings])

    useEffect(() => {
        if (!updateData) return;

        const fetchExternalData = async (APIurl, endpoint) => {
            try {
                const response = await fetch(`${APIurl}/${id}/${endpoint}`,fetchConfig());
                let data = await response.json();
                data = {...data, 'id': `${endpoint}`}
                data = {...data, 'date': getNextGameDate()}
                updateLocalstore(data, endpoint)
            } catch (error) {
                console.log(`error: `, error);
            }
        };
    
        const updateLocalstore = async (object, str) => {
            try {
                await fetch(`http://localhost:4000/${id}/${str}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(object),
                });
            } catch (error) {
                console.log(`${str} post error`, error);
            }
        }

        fetchExternalData(API.EXT_URL, API_ENDPOINT.STANDINGS);
        fetchExternalData(API.EXT_URL, API_ENDPOINT.MATCHES);
        fetchExternalData(API.EXT_URL, API_ENDPOINT.TEAMS);
        
        setUpdateData(false);
    }, [updateData])

    const fetchConfig = () => {
        return {
            method: 'GET',
            headers: {
                'X-Auth-Token': `${API.EXT_URL_TOKEN}`,
            },
        };
    };

    function getTodaysDate() {
        let date = new Date();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();   
        date = parseInt(yyyy+mm+dd);
        return date;  
    }

    const getNextGameDate = () => {
        if (!matches.matches) return
        let arr = matches.matches.filter(element => element.status === MATCH_TYPES.SCHEDULED)
        let date = (arr[0].utcDate.slice (0, -10).replace(/-/g,''))
        date = parseInt(date)
        return (date)
    }

    console.log(getNextGameDate(), getTodaysDate())

    return (
        <div className={styles.container}>
            <Sidebar id={id} setId={setId} standings={standings} url={url} />
            {!id && (
                <main className={styles.main}>
                    <Routes>
                        <Route path='/' element={<Home setId={setId} />} />
                    </Routes>
                </main>
            )}
            {id && (
                <main className={styles.main}>
                    <ReturnToTopButton />
                    {(url === URL.FIXTURES || url === URL.RESULTS) && (
                        <FilterMatches
                            matches={matches}
                            teams={teams}
                            id={id}
                            url={url}
                            filteredMatches={filteredMatches}
                            setFilteredMatches={setFilteredMatches}
                            postponedMatches={postponedMatches}
                            setPostponedMatches={setPostponedMatches}
                            cancelledMatches={cancelledMatches}
                            setCancelledMatches={setCancelledMatches}
                            matchStatus={matchStatus}
                            setMatchStatus={setMatchStatus}
                            sortType={sortType}
                            setSortType={setSortType}
                        />
                    )}
                    <Routes>
                        <Route
                            path={URL.STANDINGS}
                            element={
                                <Standings
                                    id={id}
                                    standings={standings}
                                    matches={matches}
                                    teams={teams}
                                />
                            }
                        />
                        <Route
                            path={URL.FIXTURES}
                            element={
                                <Fixtures
                                    id={id}
                                    standings={standings}
                                    matches={matches}
                                    teams={teams}
                                    postponedMatches={postponedMatches}
                                    filteredMatches={filteredMatches}
                                    matchStatus={matchStatus}
                                    sortType={sortType}

                                />
                            }
                        />
                        <Route
                            path={URL.RESULTS}
                            element={
                                <Results
                                    id={id}
                                    standings={standings}
                                    matches={matches}
                                    teams={teams}
                                    cancelledMatches={cancelledMatches}
                                    filteredMatches={filteredMatches}
                                    setFilteredMatches={setFilteredMatches}
                                    matchStatus={matchStatus}
                                    sortType={sortType}
                                />
                            }
                        />
                        <Route path={URL.HOME} element={<Home setId={setId} />} />
                    </Routes>
                </main>
            )}
        </div>
    );
};
