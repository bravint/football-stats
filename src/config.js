export const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

export const SERVER_ENDPOINT = {
    STANDINGS: 'standings',
    MATCHES: 'matches',
    TEAMS: 'teams',
};

export const CALENDAR_DAYS = {
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    Saturday: 'Saturday',
    SUNDAY: 'Sunday',
};

export const CALENDAR_MONTHS = {
    JANUARY: 'January',
    FEBRUARY: 'February',
    MARCH: 'March',
    APRIL: 'April',
    MAY: 'May',
    JUNE: 'June',
    JULY: 'July',
    AUGUST: 'August',
    SEPTEMBER: 'September',
    OCTOBER: 'October',
    NOVEMBER: 'November',
    DECEMBER: 'December',
};

export const MATCH_TYPES = {
    SCHEDULED: 'SCHEDULED',
    POSTPONED: 'POSTPONED',
    FINISHED: 'FINISHED',
    CANCELLED: 'CANCELLED',
};

export const STORE_ACTIONS = {
    CANCELLED_MATCHES: 'update/cancelledMatches',
    ID: 'update/id',
    FILTERED_FIXTURES: 'update/filteredFixtures',
    FILTERED_RESULTS: 'update/filteredResults',
    MATCHES: 'update/matches',
    MATCH_STATUS: 'update/matchStatus',
    POSTPONED_MATCHES: 'update/postponedMatches',
    REFRESH_PAGE: 'update/refreshPage',
    SORT_TYPE: 'update/sortType',
    STANDINGS: 'standings',
    TEAMS: 'update/teams',
    URL: 'update/url',
    UPDATE_DATA: 'update/updateData',
};

export const URL = {
    STANDINGS: '/standings',
    FIXTURES: '/fixtures',
    RESULTS: '/results',
    HOME: '/',
};

export const INITIAL_STATE = {
    MATCH_STATUS: 'all',
    SORT_TYPE: 'date',
};

export const MATCH_VENUE_TYPE = {
    HOME: 'Home',
    AWAY: 'Away',
};

export const SORT_TYPE = {
    DATE: 'date',
    MATCHDAY: 'matchday',
};
