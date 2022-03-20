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

import { API_ENDPOINT, API_URL, STORE_ACTIONS, URL } from './config';

import styles from './styles/App.module.css';

import { StoreContext, reducer, initialState } from './store';

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { id, url } = state;

    const handleDispatch = (type, payload) => {
        dispatch({
            type,
            payload,
        });
    };

    const location = useLocation();

    useEffect(() => {
        handleDispatch(STORE_ACTIONS.URL, location.pathname);
    }, [location]);

    useEffect(() => {
        if (!id) return;

        const fetchData = async (APIurl, endpoint, action) => {
            try {
                const response = await fetch(`${APIurl}/${id}/${endpoint}`);
                const data = await response.json();
                handleDispatch(action, data);
            } catch (error) {
                console.log(`error: `, error);
            }
        };

        fetchData(API_URL, API_ENDPOINT.STANDINGS, STORE_ACTIONS.STANDINGS);
        fetchData(API_URL, API_ENDPOINT.MATCHES, STORE_ACTIONS.MATCHES);
        fetchData(API_URL, API_ENDPOINT.TEAMS, STORE_ACTIONS.TEAMS);
    }, [id]);

    return (
        <StoreContext.Provider value={{ state: state, dispatch: dispatch }}>
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
                        {(url === URL.FIXTURES || url === URL.RESULTS) && <FilterMatches />}
                        <Routes>
                            <Route path={URL.STANDINGS} element={<Standings />} />
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
