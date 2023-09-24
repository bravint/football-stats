/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';

import { CancelledListItem } from './CancelledListItem';
import { ResultsListItem } from './ResultsListItem';

import { StoreContext, initialState } from '../../../store';

import styles from '../../../styles/Matches.module.css';

export const Results = () => {
    const store = useContext(StoreContext);

    const { matchStatus, filteredResults, cancelledMatches } = store.state;

    return (
        <section className={styles.table}>
            {!!cancelledMatches.length && (
                <>
                    <h1 className={styles.title}>CANCELLED</h1>
                    <ul>
                        <CancelledListItem />
                    </ul>
                </>
            )}
            {filteredResults &&
                (!!cancelledMatches.length || matchStatus === initialState.matchStatus) && (
                    <>
                        <h1 className={styles.title}>RESULTS</h1>
                        <ul>
                            {filteredResults.map((nested) => {
                                return <ResultsListItem nested={nested} />;
                            })}
                        </ul>
                    </>
                )}
        </section>
    );
};
