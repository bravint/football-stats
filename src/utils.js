export const getDate = (date) => {
    date = date.slice(0, -10);
    
    date = date.slice(5, 7).toString() + '/' + date.slice(8, 10).toString() + '/' + date.slice(0, 4).toString();

    date = new Date(date).toString().slice(0, 15);

    return date;
};

export const getTime = (date) => date.slice(11, -4);

export const fixTeamName = (id, team) => (id === 'PL' ? team.slice(0, -3) : team);

export const getVenue = (id, teams) => {
    const selectedTeam = teams.teams.filter((element) => element.id === id);

    return id === 397 ? 'The AMEX Stadium' : selectedTeam[0].venue;
};

export const getLogo = (id, teams) => {
    const selectedTeam = teams.teams.filter((element) => element.id === id);

    return selectedTeam[0] ? selectedTeam[0].crestUrl : null;
};

export const getMatchday = (element) => element.matchday;

export const handleDispatch = (store, action, payload) => {
    store.dispatch({
        type: action,
        payload: payload,
    });
};

export const renderTitle = (sortType, nested) => {
    if (sortType === 'date') return getDate(nested[0].utcDate);

    if (sortType === 'matchday') return 'Matchday ' + getMatchday(nested[0]);
};
