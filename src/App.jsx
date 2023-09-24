import { useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Home } from './components/Home/Home';
import { FilterMatches } from './components/Matches/FilterMatches/FilterMatches';
import { Fixtures } from './components/Matches/Fixtures/Fixtures';
import { NotFound } from './components/NotFound/NotFound';
import { Results } from './components/Matches/Results/Results';
import { ReturnToTopButton } from './components/ReturnToTopButton/ReturnToTopButton';
import { Sidebar } from './components/Sidebar/Sidebar';
import { SkipToContentButton } from './components/SkipToContentButton/SkipToContentButton';
import { Standings } from './components/Standings/Standings';

import { SERVER_ADDRESS, STORE_ACTIONS, URL } from './config';

import styles from './styles/App.module.css';

import { StoreContext, reducer, initialState } from './store';

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { id, url } = state;

    const handleDispatch = (action, payload) => dispatch({ type: action, payload });

    const location = useLocation();

    useEffect(() => {
        handleDispatch(STORE_ACTIONS.URL, location.pathname);
    }, [location]);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const endpoints = [
                    'standings',
                    'matches',
                    'teams'
                ];
                const requests = endpoints.map((endpoint) => fetch(`${SERVER_ADDRESS}/${id}/${endpoint}`));
                const responses = await Promise.all(requests);
                const [
                    standings,
                    matches,
                    teams,
                ] = await Promise.all(responses.map((response) => response.json()));

                const league = {
                    area: standings.area,
                    competition: standings.competition,
                    season: standings.season,
                    standings: standings.standings[0].table,
                    matches: matches.matches,
                    teams: teams.teams,
                };
            
                handleDispatch(STORE_ACTIONS.LEAGUE, league);
            } catch (error) {
                console.log({ error });
            }
        };

        fetchData();
    }, [id]);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            <div className={styles.container}>
                <SkipToContentButton />
                <Sidebar />
                {!id && (
                    <main className={styles.main}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                )}
                {id && (
                    <main className={styles.main}>
                        <ReturnToTopButton />
                        {(url === URL.FIXTURES || url === URL.RESULTS) && (
                            <FilterMatches />
                        )}
                        <Routes>
                            <Route
                                path={URL.STANDINGS}
                                element={<Standings />}
                            />
                            <Route path={URL.FIXTURES} element={<Fixtures />} />
                            <Route path={URL.RESULTS} element={<Results />} />
                            <Route path={URL.HOME} element={<Home />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                )}
            </div>
        </StoreContext.Provider>
    );
};
