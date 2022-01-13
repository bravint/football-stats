import { createContext } from 'react';

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

export const filteredMatchesReducer = (state, action) => {
    switch (action.type) {
        case 'update/filteredMatches':
            return action.payload;
        default:
            return state;
    }
};

export const postponedMatchesReducer = (state, action) => {
    switch (action.type) {
        case 'update/postponedMatches':
            return action.payload;;
        default:
            return state;
    }
};

export const cancelledMatchesReducer = (state, action) => {
    switch (action.type) {
        case 'update/cancelledMatches':
            return action.payload;
        default:
            return state;
    }
};

export const matchStatusReducer = (state, action) => {
    switch (action.type) {
        case 'update/matchStatus':
            return action.payload;
        default:
            return state;
    }
};

export const sortTypeReducer = (state, action) => {
    switch (action.type) {
        case 'update/sortType':
            return action.payload;
        default:
            return state;
    }
};

export const standingsReducer = (state, action) => {
    switch (action.type) {
        case 'update/standings':
            return action.payload;
        default:
            return state;
    }
};

export const matchesReducer = (state, action) => {
    switch (action.type) {
        case 'update/matches':
            return action.payload;
        default:
            return state;
    }
};

export const teamsReducer = (state, action) => {
    switch (action.type) {
        case 'update/teams':
            return action.payload;
        default:
            return state;
    }
};

export const urlReducer = (state, action) => {
    switch (action.type) {
        case 'update/url':
            return action.payload;
        default:
            return state;
    }
};

export const idReducer = (state, action) => {
    switch (action.type) {
        case 'update/id':
            return action.payload;
        default:
            return state;
    }
};

export const updateDataReducer = (state, action) => {
    switch (action.type) {
        case 'update/updateData':
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
