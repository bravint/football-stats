import { useState, useEffect } from 'react';

import { generateSortedArray } from '../../../utils.js';
import { calendar } from '../../../config.js';

import { Postponed } from './Postponed';
import { FixturesListItem } from './FixturesListItem';

import styles from '../../../styles/FixturesListItem.module.css';

export const Fixtures = (props) => {
    const { fixtures, teams, id } = props;

    const [scheduledMatches, setScheduledMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);

    console.log(`states`, {
        scheduledMatches,
        filteredMatches,
    });

    useEffect(() => {
        setScheduledMatches(
            fixtures.matches.filter((element) => element.status === 'SCHEDULED')
        );
    }, [fixtures]);

    useEffect(() => {
        const sortScheduledMatches = (inputArray) => {
            if (inputArray.length < 1) return;
            let unsortedArray = [...inputArray];
            let sortedArray = [];
            generateSortedArray(unsortedArray, sortedArray);
            setFilteredMatches(sortedArray);
        };
        sortScheduledMatches(scheduledMatches);
    }, [scheduledMatches]);

    //sorting

    const filterByTeam = (team) => {
        const filteredMatches = fixtures.matches.filter(
            (element) =>
                element.homeTeam.name === team || element.awayTeam.name === team
        );
        setFilteredMatches(filteredMatches);
    };

    const sortByMatchday = () => {};

    const sortByDate = () => {};

    const genMatchStatusArray = () => {
        const array = fixtures.matches.filter((element) => {
            if (element.status !== 'FINISHED') return element.status;
        });
        const newarray = array.map((element) => element.status);
        const status = Array.from(new Set(newarray));
        console.log(status);
    };

    const genTeamsArray = () => {
        const array = teams.teams.map((element) => element.name);
        const status = Array.from(new Set(array));
        console.log(status);
    };

    console.log(`months`, calendar.months);

    genMatchStatusArray();
    genTeamsArray();

    /*
    useEffect(() => {
        filterByTeam('Manchester United FC')
        sortbyDate()
    }, [fixtures]);
    */

    return (
        <>
            
            <section className={styles.results}>
                {fixtures.matches && (
                    <>
                        <Postponed fixtures={fixtures} teams={teams} id={id} />
                        <h1 >SCHEDULED</h1>
                        {filteredMatches.map((nested, index) => {
                            return (
                                <FixturesListItem
                                    nested={nested}
                                    teams={teams}
                                    key={new Date().getTime()}
                                    id={id}
                                />
                            );
                        })}
                        <li className={styles.matchList} key={filteredMatches.length+1}>
                            <div className={styles.matchDetailsBlank}></div>
                        </li>
                    </>
                )}
            </section>
        </>
    );
};
