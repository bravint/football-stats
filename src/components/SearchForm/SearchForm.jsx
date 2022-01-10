import { useNavigate } from "react-router";

import styles from "../../styles/Home.module.css";

export const Form = (props) => {
    const { setId } = props;

    const navigate = useNavigate();

    const handleChange = (event) => {
        setId(event.target.value);
        navigate("./standings", { replace: true });
    };

    return (
        <form className={styles.sidebarForm} id="league-select-form">
            <select
                id="league"
                name="league"
                className={styles.league}
                onChange={(event) => handleChange(event)}
            >
                <option value="default">Choose a league</option>
                <option value="BL1">Bundesliga, Germany</option>
                <option value="PD">La Liga, Spain</option>
                <option value="FL1">Ligue 1, France</option>
                <option value="PL">Premier League, England</option>
                <option value="SA">Serie A, Italy</option>
            </select>
        </form>
    );
};
