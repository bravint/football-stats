import { createContext } from 'react';

import { STORE_ACTIONS } from './config';

export const StoreContext = createContext();

export const initialState = {
    cancelledMatches: [],
    id: '',
    filteredMatches: [],
    postponedMatches: [],
    matches: [],
    matchStatus: 'all',
    sortType: 'date',
    standings: [],
    teams: [],
    updateData: false,
    url: '',
};

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
            return action.payload;
        default:
            return state;
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
