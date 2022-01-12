export const API_EXT_URL = process.env.REACT_APP_API_EXT_URL;

export const API_EXT_TOKEN = process.env.REACT_APP_API_EXT_TOKEN;

export const API_INT_URL = process.env.REACT_APP_API_INT_URL;

export class API_ENDPOINT {
    static STANDINGS = 'standings';
    static MATCHES = 'matches';
    static TEAMS = 'teams';
}

export class URL {
    static STANDINGS = '/standings';
    static FIXTURES = '/fixtures';
    static RESULTS = '/results';
    static HOME = '/';
}

export class CALENDAR {
    static DAYS = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];
    static MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
}

export class MATCH_TYPES {
    static SCHEDULED = 'SCHEDULED';
    static POSTPONED = 'POSTPONED';
    static FINISHED = 'FINISHED';
    static CANCELLED = 'CANCELLED';
}