import { Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Sidebar } from './components/Sidebar/Sidebar';
import { Standings } from './components/Standings/Standings';
import { Fixtures } from './components/Matches/Fixtures/Fixtures';
import { Results } from './components/Matches/Results/Results';
import { Home } from './components/Home/Home';
import { ReturnToTopButton } from './components/ReturnToTopButton/ReturnToTopButton';

import { api, apiEndpoints } from './config';

import styles from './styles/App.module.css';
import { FilterMatches } from './components/Matches/FilterMatches/FilterMatches';

export const App = () => {
    const [id, setId] = useState(null);
    const [league, setLeague] = useState({});
    const [fixtures, setFixtures] = useState({});
    const [teams, setTeams] = useState({});
    const [url, setUrl] = useState('');

    const [filteredMatches, setFilteredMatches] = useState([]);
    const [postponedMatches, setPostponedMatches] = useState([]);
    const [cancelledMatches, setCancelledMatches] = useState([]);
    const [matchStatus, setMatchStatus] = useState('all');
    const [sortType, setSortType] = useState('date');

    
    console.log(`states`, {
        league,
        fixtures,
        teams,
        id,
        url,
        filteredMatches,
        postponedMatches,
        cancelledMatches
    });
    

    const location = useLocation();

    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    useEffect(() => {
        if (!id) return;
        const fetchLeague = async () => {
            try {
                const response = await fetch(
                    `${api.extUrl}/${id}/${apiEndpoints.standings}`,
                    fetchConfig()
                );
                const data = await response.json();
                setLeague(data);
            } catch (error) {
                console.log(`error: `, error);
            }
        };

        const fetchFixtures = async () => {
            try {
                const response = await fetch(
                    `${api.extUrl}/${id}/${apiEndpoints.matches}`,
                    fetchConfig()
                );
                const data = await response.json();
                setFixtures(data);
            } catch (error) {
                console.log(`error: `, error);
            }
        };

        const fetchTeams = async () => {
            try {
                const response = await fetch(
                    `${api.extUrl}/${id}/${apiEndpoints.teams}`,
                    fetchConfig()
                );
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.log(`error: `, error);
            }
        };

        const fetchConfig = () => {
            return {
                method: 'GET',
                headers: {
                    'X-Auth-Token': `${api.token}`,
                },
            };
        };

        fetchLeague();
        fetchFixtures();
        fetchTeams();
    }, [id]);

    const populateJSONServer = async () => {
        const newObject = JSON.parse(JSON.stringify(teams))
        const objToPush = {...newObject, 'id': 'teams'}
        try {
            const response = await fetch(`http://localhost:4000/${id}/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objToPush),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log("address post error", error);
        }
    }

    useEffect(() => {
        if (teams.teams) {
            console.log('POSTING')
            //populateJSONServer()
        };
    }, [fixtures])

    return (
        <div className={styles.container}>
            <Sidebar id={id} setId={setId} league={league} url={url} />
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
                    {(url === '/fixtures' || url === '/results') && (
                        <FilterMatches
                            fixtures={fixtures}
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
                            path='/standings'
                            element={
                                <Standings
                                    id={id}
                                    league={league}
                                    fixtures={fixtures}
                                    teams={teams}
                                />
                            }
                        />
                        <Route
                            path='/fixtures'
                            element={
                                <Fixtures
                                    id={id}
                                    league={league}
                                    fixtures={fixtures}
                                    teams={teams}
                                    postponedMatches={postponedMatches}
                                    filteredMatches={filteredMatches}
                                    matchStatus={matchStatus}
                                    sortType={sortType}

                                />
                            }
                        />
                        <Route
                            path='/results'
                            element={
                                <Results
                                    id={id}
                                    league={league}
                                    fixtures={fixtures}
                                    teams={teams}
                                    cancelledMatches={cancelledMatches}
                                    filteredMatches={filteredMatches}
                                    setFilteredMatches={setFilteredMatches}
                                    matchStatus={matchStatus}
                                    sortType={sortType}
                                />
                            }
                        />
                        <Route path='/' element={<Home setId={setId} />} />
                    </Routes>
                </main>
            )}
        </div>
    );
};
