import { useState, useEffect } from "react";
import PostponedListItem from "./PostponedListItem";

import styles from '../../../styles/FixturesListItem.module.css';

export const Postponed = (props) => {
    const { fixtures, teams, id } = props;

    const [filteredMatches, setFilteredMatches] = useState([]);

    console.log(`states`, {
        fixtures,
        teams,
        id,
    });

    useEffect(() => {
        setFilteredMatches(
            fixtures.matches.filter((element) => element.status === "POSTPONED")
        );
    }, [fixtures]);

    return (
        <>
            {filteredMatches.length > 1 && (
                <>
                    <h1 className={styles.title}>POSTPONED</h1>
                    {filteredMatches.map((element) => {
                        return (
                            <PostponedListItem
                                element={element}
                                key={element.id}
                                teams={teams}
                                id={id}
                            />
                        );
                    })}
                </>
            )}
        </>
    );
};
