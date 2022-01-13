/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Home } from './components/Home/Home';
import { FilterMatches } from './components/Matches/FilterMatches/FilterMatches';
import { Fixtures } from './components/Matches/Fixtures/Fixtures';
import { Results } from './components/Matches/Results/Results';
import { ReturnToTopButton } from './components/ReturnToTopButton/ReturnToTopButton';
import { Sidebar } from './components/Sidebar/Sidebar';
import { SkipToContentButton } from './components/SkipToContentButton/SkipToContentButton';
import { Standings } from './components/Standings/Standings';

import {
    API_EXT_URL,
    API_EXT_TOKEN,
    API_INT_URL,
    API_ENDPOINT,
    MATCH_TYPES,
    STORE_ACTIONS,
    URL,
} from './config';

import styles from './styles/App.module.css';

import { StoreContext, rootReducer, initialState } from './store';

export const App = () => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    const id = state.id;
    const matches = state.matches;
    const url = state.url;
    const updateData = state.updateData;

    console.log(`states`, state);

    const doDispatch = (action, payload) => {
        dispatch({
            type: action,
            payload: payload,
        });
    };

    const location = useLocation();

    useEffect(() => {
        doDispatch(STORE_ACTIONS.URL, location.pathname);
    }, [location]);

    useEffect(() => {
        if (!id) return;

        const fetchLocalData = async (APIurl, endpoint, action) => {
            try {
                const response = await fetch(
                    `${APIurl}/${id}/${endpoint}`,
                    fetchConfig()
                );
                const data = await response.json();
                doDispatch(action, data);
            } catch (error) {
                console.log(`error: `, error);
            }
        };

        fetchLocalData(API_INT_URL, API_ENDPOINT.STANDINGS, STORE_ACTIONS.STANDINGS);
        fetchLocalData(API_INT_URL, API_ENDPOINT.MATCHES, STORE_ACTIONS.MATCHES);
        fetchLocalData(API_INT_URL, API_ENDPOINT.TEAMS, STORE_ACTIONS.TEAMS);
    }, [id]);

    useEffect(() => {
        if (!matches.matches) return;
        if (getTodaysDate() >= matches.date || !matches.date)
            doDispatch(STORE_ACTIONS.UPDATE_DATA, true);
    }, [matches]);

    useEffect(() => {
        if (!updateData) return;
        doDispatch(STORE_ACTIONS.UPDATE_DATA, false);

        const fetchExternalData = async (APIurl, endpoint) => {
            try {
                const response = await fetch(
                    `${APIurl}/${id}/${endpoint}`,
                    fetchConfig()
                );
                let data = await response.json();
                data = { ...data, id: `${endpoint}` };
                data = { ...data, date: getNextGameDate() };
                updateLocalstore(data, endpoint);
            } catch (error) {
                console.log(`error: `, error);
            }
        };

        const updateLocalstore = async (object, str) => {
            try {
                await fetch(`${API_INT_URL}/${id}/${str}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(object),
                });
            } catch (error) {
                console.log(`${str} post error`, error);
            }
        };

        fetchExternalData(API_EXT_URL, API_ENDPOINT.STANDINGS);
        fetchExternalData(API_EXT_URL, API_ENDPOINT.MATCHES);
        fetchExternalData(API_EXT_URL, API_ENDPOINT.TEAMS);

        doDispatch(STORE_ACTIONS.UPDATE_DATA, false);
    }, [updateData]);

    const fetchConfig = () => {
        return {
            method: 'GET',
            headers: {
                'X-Auth-Token': API_EXT_TOKEN,
            },
        };
    };

    function getTodaysDate() {
        let date = new Date();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        date = parseInt(yyyy + mm + dd);
        return date;
    }

    const getNextGameDate = () => {
        if (!matches.matches) return;
        let arr = matches.matches.filter(
            (element) => element.status === MATCH_TYPES.SCHEDULED
        );
        let date = arr[0].utcDate.slice(0, -10).replace(/-/g, '');
        date = parseInt(date);
        return date;
    };

    return (
        <StoreContext.Provider value={{ state: state, dispatch: dispatch }}>
            <div className={styles.container}>
                <SkipToContentButton />
                <Sidebar />
                {!id && (
                    <main className={styles.main}>
                        <Routes>
                            <Route path="/" element={<Home />} />
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
                        </Routes>
                    </main>
                )}
            </div>
        </StoreContext.Provider>
    );
};
