export const generateSortedArray = (unsortedArray, sortedArray, sortType) => {
    if (unsortedArray.length < 1 && sortType === 'date') return;
    if (unsortedArray.length < 1 && sortType === 'matchday') return sortByMatchday(sortedArray)
    if (sortType === 'date' ) {    
        let date = getDate(unsortedArray[0].utcDate);
        let nestedArray = unsortedArray.filter((element) => getDate(element.utcDate) === date);
        sortedArray.push(nestedArray);
        unsortedArray = unsortedArray.filter((element) => getDate(element.utcDate) !== date);
        generateSortedArray(unsortedArray, sortedArray, sortType);
    }
    if (sortType === 'matchday' ) {    
        let matchday = getMatchday(unsortedArray[0]);
        let nestedArray = unsortedArray.filter((element) => getMatchday(element) === matchday);
        sortedArray.push(nestedArray);
        unsortedArray = unsortedArray.filter((element) => getMatchday(element) !== matchday);
        generateSortedArray(unsortedArray, sortedArray, sortType);
    }
}

export const getDate = (date) => {
    date = date.slice(0, -10);
    date = date.slice(5, 7).toString() + '/' +date.slice(8, 10).toString() + '/' + date.slice(0, 4).toString();
    date = new Date(date).toString().slice(0, 15);
    return date;
}

export const getTime = (date) => date.slice(11, -4);

export const fixTeamName = (id ,team) => id === 'PL' ? team.slice(0, -3) : team

export const getVenue = (id, teams) => {
    const selectedTeam = teams.teams.filter((element) => element.id === id);
    return (id === 397) ? 'The AMEX Stadium' : selectedTeam[0].venue;
};

export const getLogo = (id, teams) => {
    const selectedTeam = teams.teams.filter((element) => element.id === id);
    return (selectedTeam[0]) ? selectedTeam[0].crestUrl : null;
};

export const getMatchday = (element) => element.matchday;

const sortByMatchday = (sortedArray) => {
    sortedArray.sort(function (a, b) {
        return a[0].matchday - b[0].matchday;
})};

export const doDispatch  = (store, action, payload) => {
    store.dispatch({
        type: action,
        payload: payload
      })
}

export const renderTitle = (sortType, nested) => {
    if (sortType === 'date') return getDate(nested[0].utcDate);
    if (sortType === 'matchday') return 'Matchday ' + getMatchday(nested[0]);
};
