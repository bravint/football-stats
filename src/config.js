export const SERVER_ADDRESS = import.meta.env.VITE_APP_SERVER_ADDRESS;

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
    TIMED: 'TIMED',
};

export const STORE_ACTIONS = {
    CANCELLED_MATCHES: 'cancelledMatches',
    ID: 'id',
    LEAGUE: 'league',
    FILTERED_FIXTURES: 'filteredFixtures',
    FILTERED_RESULTS: 'filteredResults',
    MATCH_STATUS: 'matchStatus',
    POSTPONED_MATCHES: 'postponedMatches',
    REFRESH_PAGE: 'refreshPage',
    SORT_TYPE: 'sortType',
    URL: 'url',
    UPDATE_DATA: 'updateData',
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
