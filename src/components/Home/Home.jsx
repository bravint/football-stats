import { useNavigate } from "react-router";

import styles from "./Home.module.css"

function Home(props) {
    const { setId } = props;

    const navigate = useNavigate();

    const handleChange = (event) => {
        setId(event.target.value);
        navigate("./standings", { replace: true });
    };

    return (
        <div className={styles.container}>
            <section className="title">
                <h1>Welcome to Football Stats</h1>
                <h3>Choose a league below to get started!</h3>
            </section>
            <form className={styles.sidebarForm} id="league-select-form">
            <select
                id="league"
                name="league"
                className={styles.league}
                onChange={(event) => handleChange(event)}
                >
                    <option value="default">Choose a league</option>
                    <option value="BL1">Bundersliga, Germany</option>
                    <option value="PD">La Liga, Spain</option>
                    <option value="FL1">Ligue 1, France</option>
                    <option value="PL">Premier League, England</option>
                    <option value="SA">Serie A, Italy</option>
                </select>
            </form>
        </div>
    );
}

export default Home;
