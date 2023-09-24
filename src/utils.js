export const getTime = (date) => date.slice(11, -4);

export const fixTeamName = (id, team) =>
    id !== 'PL' || team === 'AFC Bournemouth' ? team : team.slice(0, -3);

export const getVenue = (teamId, teams) => {
    // Shorten Brighton & Hove Albion stadium's name
    const BRIGHTON_TEAM_ID = 397;

    if (teamId === BRIGHTON_TEAM_ID) {
        return 'The AMEX Stadium';
    }

    const teamById = teams.find(({ id }) => teamId === id);
    return teamById ? teamById.venue : null;
};

export const getLogo = (teamId, teams) => {
    const teamById = teams.find(({ id }) => teamId === id);
    return teamById ? teamById.crest : null;
};

export const handleDispatch = (store, action, payload) => store.dispatch({ type: action, payload });

export const formatDate = (date) => {
    date =
        date.slice(5, 7).toString() +
        '/' +
        date.slice(8, 10).toString() +
        '/' +
        date.slice(0, 4).toString();
    return new Date(date).toString().slice(0, 15);
};

export const renderTitle = (sortType, matches) => {
    if (sortType === 'date') {
        return formatDate(matches[0].utcDate)
    };

    if (sortType === 'matchday') {
        return 'Matchday ' + matches[0].matchday
    };
};
