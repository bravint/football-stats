import { useState, useEffect } from "react";

import { generateSortedArray, getDate, getTime } from "../utils.js"

function FixturesListItem(props) {
    const { fixtures, teams } = props;

    const [postponedMatches, setPostponedMatches] = useState([]);
    const [scheduledMatches, setScheduledMatches] = useState([]);
    const [renderArray, setRenderArray] = useState([]);

    console.log(`states`, {
        fixtures,
        teams
    })

    useEffect(() => {
        setPostponedMatches(
            fixtures.matches.filter((element) => element.status === "POSTPONED")
        );

        setScheduledMatches(
            fixtures.matches.filter((element) => element.status === "SCHEDULED")
        );
    }, [fixtures]);

    useEffect(() => {
        function sortScheduledMatches (inputArray) {
            if (inputArray.length < 1) return;
            let unsortedArray = [...inputArray];
            let sortedArray = [];
            generateSortedArray(unsortedArray, sortedArray);
            setRenderArray(sortedArray);
        };
        sortScheduledMatches(scheduledMatches);
    }, [scheduledMatches]);

    console.log(`states`, {
        postponedMatches,
        scheduledMatches,
        renderArray,
    });

    const getVenue = (id) => {
        const selectedTeam = teams.teams.filter(element => element.id === id)
        return selectedTeam[0].venue
    }

    return (
        <>
            {postponedMatches.length > 1 && (
                <>
                    <h1>POSTPONED</h1>
                    {postponedMatches.map((element) => {
                        return (
                            <section className="extra-stats expandable">
                                <p>
                                    Originally scheduled for:{" "}
                                    {getDate(element.utcDate)} ,{" "}
                                    {getTime(element.utcDate)}
                                </p>
                                <p>
                                    {element.homeTeam.name} vs{" "}
                                    {element.awayTeam.name}
                                </p>
                                <p>{getVenue(element.homeTeam.id)}</p>
                            </section>
                        );
                    })}
                </>
            )}

            <h1>SCHEDULED</h1>
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
        </>
    );
}

export default FixturesListItem;
