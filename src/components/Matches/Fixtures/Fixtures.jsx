import FixturesListItem from "./FixturesListItem"

import styles from "../../../styles/FixturesListItem.module.css";

function Fixtures(props) {
    const { fixtures, teams, id } = props
    
    return (
        <section className={styles.results}>
            {fixtures.matches && (
                <FixturesListItem fixtures={fixtures} teams={teams} id={id}/>
            )}
        </section>
    );
}

export default Fixtures