export const generateSortedArray = (unsortedArray, sortedArray) => {
    if (unsortedArray.length < 1) return;
    let date = getDate(unsortedArray[0].utcDate);
    let nestedArray = unsortedArray.filter((element) => getDate(element.utcDate) === date);
    sortedArray.push(nestedArray);
    unsortedArray = unsortedArray.filter((element) => getDate(element.utcDate) !== date);
    generateSortedArray(unsortedArray, sortedArray);
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
    if (id === 397) return 'The AMEX Stadium';
    return selectedTeam[0].venue;
};

export const getLogo = (id, teams) => {
    const selectedTeam = teams.teams.filter((element) => element.id === id);
    return selectedTeam[0].crestUrl;
};
