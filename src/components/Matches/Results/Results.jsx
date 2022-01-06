import { useEffect, useState } from "react";

import { generateSortedArray, getDate, fixTeamName } from "../../../utils.js";

import styles from "../../../styles/FixturesListItem.module.css";

export const Results = (props) => {
    const { fixtures, teams, id } = props;

    const [results, setResults] = useState([]);
    const [renderArray, setRenderArray] = useState([]);

    useEffect(() => {
        setResults(
            fixtures.matches.filter((element) => element.status === "FINISHED")
        );
    }, [fixtures]);

    useEffect(() => {
        const sortScheduledMatches = (inputArray) => {
            if (inputArray.length < 1) return;
            let unsortedArray = [...inputArray];
            let sortedArray = [];
            generateSortedArray(unsortedArray, sortedArray);
            sortedArray.reverse();
            setRenderArray(sortedArray);
        }
        sortScheduledMatches(results);
    }, [results]);

    const getVenue = (id) => {
        const selectedTeam = teams.teams.filter((element) => element.id === id);
        if (id === 397) return "The AMEX Stadium";
        return selectedTeam[0].venue;
    };

    console.log(`states`, {
        results,
        renderArray,
    });

    return (
        <div>
            {renderArray.map((nested) => {
                return (
                    <section className={styles.results}>
                        <h3>{getDate(nested[0].utcDate)}</h3>
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
                                        <p>
                                            {element.score.fullTime.homeTeam} -{" "}
                                            {element.score.fullTime.awayTeam}
                                        </p>
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
                    </section>
                );
            })}
        </div>
    );
};

export default Results;
