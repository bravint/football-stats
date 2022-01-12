/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';

import { Postponed } from './Postponed';
import { FixturesListItem } from './FixturesListItem';

import styles from '../../../styles/FixturesListItem.module.css';

import { StoreContext } from "../../../store";

export const Fixtures = (props) => {
    const {
        teams,
        id,
    } = props;

    const store = useContext(StoreContext);
    
    const matchStatus = store.state.matchStatus;
    const sortType = store.state.sortType;
    const filteredMatches = store.state.filteredMatches;
    const postponedMatches = store.state.postponedMatches;

    return (
        <>
            <section className={styles.results}>
                {postponedMatches.length > 1 && (
                    <Postponed
                        teams={teams}
                        id={id}
                        postponedMatches={postponedMatches}
                    />
                )}
                {filteredMatches &&
                    (postponedMatches.length < 1 || matchStatus === 'all') && (
                        <>
                            <h1 className={styles.title}>SCHEDULED</h1>
                            {filteredMatches.map((nested, index) => {
                                return (
                                    <FixturesListItem
                                        sortType={sortType}
                                        nested={nested}
                                        teams={teams}
                                        key={index}
                                        id={id}
                                    />
                                );
                            })}
                        </>
                    )}
            </section>
        </>
    );
};
