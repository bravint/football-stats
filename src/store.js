import { createContext } from 'react';

import { STORE_ACTIONS, INITIAL_STATE } from './config';

export const StoreContext = createContext();

export const initialState = {
    cancelledMatches: [],
    id: localStorage.getItem('league_id'),
    filteredFixtures: [],
    filteredResults: [],
    postponedMatches: [],
    matches: [],
    matchStatus: INITIAL_STATE.MATCH_STATUS,
    refreshPage: false,
    sortType: INITIAL_STATE.SORT_TYPE,
    standings: [],
    teams: [],
    updateData: false,
    url: '',
};

export const reducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.CANCELLED_MATCHES:
            return {
                ...state,
                cancelledMatches: action.payload,
            };
        case STORE_ACTIONS.ID:
            return {
                ...state,
                id: action.payload,
            };
        case STORE_ACTIONS.FILTERED_FIXTURES:
            return {
                ...state,
                filteredFixtures: action.payload,
            };
        case STORE_ACTIONS.FILTERED_RESULTS:
            return {
                ...state,
                filteredResults: action.payload,
            };
        case STORE_ACTIONS.POSTPONED_MATCHES:
            return {
                ...state,
                postponedMatches: action.payload,
            };
        case STORE_ACTIONS.MATCHES:
            return {
                ...state,
                matches: action.payload,
            };
        case STORE_ACTIONS.MATCH_STATUS:
            return {
                ...state,
                matchStatus: action.payload,
            };
        case STORE_ACTIONS.REFRESH_PAGE:
            return {
                ...state,
                refreshPage: action.payload,
            };
        case STORE_ACTIONS.SORT_TYPE:
            return {
                ...state,
                sortType: action.payload,
            };
        case STORE_ACTIONS.STANDINGS:
            return {
                ...state,
                standings: action.payload,
            };
        case STORE_ACTIONS.TEAMS:
            return {
                ...state,
                teams: action.payload,
            };
        case STORE_ACTIONS.URL:
            return {
                ...state,
                url: action.payload,
            };
        case STORE_ACTIONS.UPDATE_DATA:
            return {
                ...state,
                updateData: action.payload,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};
