import { createContext } from 'react';

import { INITIAL_STATE } from './config';

export const StoreContext = createContext();

export const initialState = {
    cancelledMatches: [],
    id: '',
    filteredFixtures: [],
    filteredResults: [],
    postponedMatches: [],
    league: {
        standings: [],
        matches: [],
        teams: [],
        area: {},
        season : {},
        competition: {},
    },
    matchStatus: INITIAL_STATE.MATCH_STATUS,
    refreshPage: false,
    sortType: INITIAL_STATE.SORT_TYPE,
    updateData: false,
    url: '',
};

export const reducer = (state, action) => ({
    ...state,
    [action.type]: action.payload,
});
