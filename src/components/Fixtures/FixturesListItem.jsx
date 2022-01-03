import { useState, useEffect } from "react";

function FixturesListItem(props) {
    const { fixtures } = props;

    const [postponedMatches, setPostponedMatches] = useState([]);
    const [scheduledMatches, setScheduledMatches] = useState([]);
    const [renderArray, setRenderArray] = useState([]);

    useEffect(() => {
        setPostponedMatches(
            fixtures.matches.filter((element) => element.status === "POSTPONED")
        );

        setScheduledMatches(
            fixtures.matches.filter((element) => element.status === "SCHEDULED")
        );
    }, [fixtures]);

    useEffect(() => {
        const sortScheduledMatches = () => {
            if (scheduledMatches.length < 1) return;
            let unsortedArray = [...scheduledMatches];
            let sortedArray = [];
            generateSortedArray(unsortedArray, sortedArray);
            setRenderArray(sortedArray);
        };

        const generateSortedArray = (unsortedArray, sortedArray) => {
            if (unsortedArray.length < 1) return;
            let date = getDate(unsortedArray[0].utcDate);
            let nestedArray = unsortedArray.filter(
                (element) => getDate(element.utcDate) === date
            );
            sortedArray.push(nestedArray);
            unsortedArray = unsortedArray.filter(
                (element) => getDate(element.utcDate) !== date
            );
            generateSortedArray(unsortedArray, sortedArray);
        };

        sortScheduledMatches();
    }, [scheduledMatches]);

    console.log(`states`, {
        postponedMatches,
        scheduledMatches,
        renderArray,
    });

    const getDate = (date) => date.slice(0, -10);

    const getTime = (date) => date.slice(11, -4);

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
