import { useEffect, useState } from "react";

import { generateSortedArray, getDate, getTime } from "../utils.js"

function Results(props) {
    const { fixtures, teams } = props;

    const [results, setResults] = useState([]);
    const [renderArray, setRenderArray] = useState([]);

    useEffect(() => {
        setResults(
            fixtures.matches.filter((element) => element.status === "FINISHED")
        );
    }, [fixtures]);

    useEffect(() => {
        function sortScheduledMatches(inputArray) {
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
                    <>
                        <p>{getDate(nested[0].utcDate)}</p>
                        {nested.map((element) => {
                            return (
                                <>
                                    <section className="extra-stats expandable">
                                        <p>
                                            {element.homeTeam.name} vs{" "}
                                            {element.awayTeam.name}
                                        </p>
                                        <p>{getTime(element.utcDate)}</p>
                                        <p>{getVenue(element.homeTeam.id)}</p>
                                    </section>
                                </>
                            );
                        })}
                    </>
                );
            })}
        </div>
    );
}

export default Results;
