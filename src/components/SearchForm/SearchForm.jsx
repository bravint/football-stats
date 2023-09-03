import { useContext } from 'react';
import { useNavigate } from 'react-router';

import styles from '../../styles/Home.module.css';

import { STORE_ACTIONS, URL } from '../../config';
import { StoreContext, initialState } from '../../store';

export const SearchForm = () => {
    const navigate = useNavigate();

    const store = useContext(StoreContext);

    const handleDispatch = (action, payload) => store.dispatch({ type: action, payload });
    
    const handleChange = (event) => {
        handleDispatch(STORE_ACTIONS.LEAGUE, initialState.league );
        handleDispatch(STORE_ACTIONS.ID, event.target.value);
        
        navigate(URL.STANDINGS, { replace: true });
    };

    return (
        <form className={styles.sidebarForm} id="league-select-form">
            <select
                id="league"
                name="league"
                className={styles.league}
                onChange={handleChange}
            >
                <option selected disabled>
                    Choose a league
                </option>
                <option value="BL1">Bundesliga, Germany</option>
                <option value="PD">La Liga, Spain</option>
                <option value="FL1">Ligue 1, France</option>
                <option value="PL">Premier League, England</option>
                <option value="SA">Serie A, Italy</option>
            </select>
        </form>
    );
};
