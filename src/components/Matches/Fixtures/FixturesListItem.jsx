import { useState, useEffect } from "react";

import {
    generateSortedArray,
    getDate,
    getTime,
    fixTeamName,
} from "../../../utils.js";

import styles from "../../../styles/FixturesListItem.module.css";

function FixturesListItem(props) {
    const { fixtures, teams, id } = props;

    const [postponedMatches, setPostponedMatches] = useState([]);
    const [scheduledMatches, setScheduledMatches] = useState([]);
    const [renderArray, setRenderArray] = useState([]);

    console.log(`states`, {
        fixtures,
        teams,
    });

    useEffect(() => {
        setPostponedMatches(
            fixtures.matches.filter((element) => element.status === "POSTPONED")
        );

        setScheduledMatches(
            fixtures.matches.filter((element) => element.status === "SCHEDULED")
        );
    }, [fixtures]);

    useEffect(() => {
        function sortScheduledMatches(inputArray) {
            if (inputArray.length < 1) return;
            let unsortedArray = [...inputArray];
            let sortedArray = [];
            generateSortedArray(unsortedArray, sortedArray);
            setRenderArray(sortedArray);
        }
        sortScheduledMatches(scheduledMatches);
    }, [scheduledMatches]);

    console.log(`states`, {
        postponedMatches,
        scheduledMatches,
        renderArray,
    });

    const getVenue = (id) => {
        const selectedTeam = teams.teams.filter((element) => element.id === id);
        if (id === 397) return "The AMEX Stadium";
        return selectedTeam[0].venue;
    };

    return (
        <>
            {postponedMatches.length > 1 && (
                <>
                    <h1>POSTPONED</h1>
                    {postponedMatches.map((element) => {
                        return (
                            <li className={styles.matchList}>
                                <section className={styles.matchDetails}>
                                    <p>
                                        {fixTeamName(id, element.homeTeam.name)}
                                    </p>
                                    <p>vs</p>
                                    <p className={styles.awayTeam}>
                                        {fixTeamName(id, element.awayTeam.name)}
                                    </p>
                                    <p className={styles.venue}>
                                        {getVenue(element.homeTeam.id)}
                                    </p>
                                </section>
                            </li>
                        );
                    })}
                </>
            )}

            <h1>SCHEDULED</h1>
            {renderArray.map((nested) => {
                return (
                    <>
                        <h3 className={styles.title}>
                            {getDate(nested[0].utcDate)}
                        </h3>
                        {nested.map((element) => {
                            return (
                                <li className={styles.matchList}>
                                    <section className={styles.matchDetails}>
                                        <p>
                                            {fixTeamName(
                                                id,
                                                element.homeTeam.name
                                            )}
                                        </p>
                                        <p>{getTime(element.utcDate)}</p>
                                        <p className={styles.awayTeam}>
                                            {fixTeamName(
                                                id,
                                                element.awayTeam.name
                                            )}
                                        </p>
                                        <p className={styles.venue}>
                                            {getVenue(element.homeTeam.id)}
                                        </p>
                                    </section>
                                </li>
                            );
                        })}
                    </>
                );
            })}
        </>
    );
}

export default FixturesListItem;
