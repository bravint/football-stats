import { useEffect, useState } from "react";

import { ResultsListItem } from "./ResultsListItem";
import { generateSortedArray } from "../../../utils.js";

import styles from '../../../styles/FixturesListItem.module.css';

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
        };
        sortScheduledMatches(results);
    }, [results]);

    console.log(`states`, {
        results,
        renderArray,
    });

    return (
        <section className={styles.results}>
            {renderArray.map((nested) => {
                return (
                    <ResultsListItem nested={nested} teams={teams} id={id} />
                );
            })}
        </section>
    );
};

export default Results;
