import { createContext } from 'react';

import { STORE_ACTIONS, INITIAL_STATE } from './config';

export const StoreContext = createContext();

export const initialState = {
    cancelledMatches: [],
    id: '',
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
                ...state, cancelledMatches: action.payload
            }
        case STORE_ACTIONS.ID:
            return {
                ...state, id: action.payload
            }
        case STORE_ACTIONS.FILTERED_FIXTURES:
            return {
                ...state, filteredFixtures: action.payload
            }
        case STORE_ACTIONS.FILTERED_RESULTS:
            return {
                ...state, filteredResults: action.payload
            }
        case STORE_ACTIONS.POSTPONED_MATCHES:
            return {
                ...state, postponedMatches: action.payload
            }
        case STORE_ACTIONS.MATCHES:
            return {
                ...state, matches: action.payload
            }
        case STORE_ACTIONS.MATCH_STATUS:
            return {
                ...state, matchStatus: action.payload
            }
        case STORE_ACTIONS.REFRESH_PAGE:
            return {
                ...state, refreshPage: action.payload
            }
        case STORE_ACTIONS.SORT_TYPE:
            return {
                ...state, sortType: action.payload
            }
        case STORE_ACTIONS.STANDINGS:
            return {
                ...state, standings: action.payload
            }
        case STORE_ACTIONS.TEAMS:
            return {
                ...state, teams: action.payload
            }
        case STORE_ACTIONS.URL:
            return {
                ...state, url: action.payload
            }
        case STORE_ACTIONS.UPDATE_DATA:
            return {
                ...state, updateData: action.payload
            }
        default:
            throw new Error(`Unknown action type: ${action.type}`);
        }
}

/*
export const cancelledMatchesReducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.CANCELLED_MATCHES:
            return action.payload;
        default:
            return state;
    }
};

export const idReducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.ID:
            return {...state, action.payload}
        default:
            return state
    }
};

export const filteredMatchesReducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.FILTERED_MATCHES:
            return action.payload;
        default:
            return state;
    }
};

export const postponedMatchesReducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.POSTPONED_MATCHES:
            return action.payload;
        default:
            return state;
    }
};

export const matchesReducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.MATCHES:
            return action.payload;
        default:
            return state;
    }
};

export const matchStatusReducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.MATCH_STATUS:
            return action.payload;
        default:
            return state;
    }
};

export const sortTypeReducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.SORT_TYPE:
            return action.payload;
        default:
            return state;
    }
};

export const standingsReducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.STANDINGS:
            return action.payload;
        default:
            return state;
    }
};

export const teamsReducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.TEAMS:
            return action.payload;
        default:
            return state;
    }
};

export const urlReducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.URL:
            return action.payload;
        default:
            return state;
    }
};

export const updateDataReducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.UPDATE_DATA:
            return action.payload;
        default:
            return state;
    }
};

const combineReducers = (reducers) => {
    return (state = {}, action) => {
        const newState = {};
        for (let key in reducers) {
            newState[key] = reducers[key](state[key], action);
        }
        return newState;
    };
};

export const rootReducer = combineReducers({
    cancelledMatches: cancelledMatchesReducer,
    id: idReducer,
    filteredMatches: filteredMatchesReducer,
    postponedMatches: postponedMatchesReducer,
    matches: matchesReducer,
    matchStatus: matchStatusReducer,
    sortType: sortTypeReducer,
    standings: standingsReducer,
    teams: teamsReducer,
    url: urlReducer,
    updateData: updateDataReducer,
});
*/
