/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';

import { CancelledListItem } from './CancelledListItem';
import { ResultsListItem } from './ResultsListItem';

import { StoreContext, initialState } from '../../../store';

import styles from '../../../styles/Matches.module.css';

export const Results = () => {
    const store = useContext(StoreContext);

    const { matchStatus, filteredMatches, cancelledMatches } = store.state;

    return (
        <section className={styles.results}>
            {cancelledMatches.length > 1 && (
                <>
                    <h1 className={styles.title}>CANCELLED</h1>
                    <CancelledListItem />
                </>
            )}
            {filteredMatches &&
                (cancelledMatches.length < 1 || matchStatus === initialState.matchStatus) && (
                    <>
                        <h1 className={styles.title}>RESULTS</h1>
                        {filteredMatches.map((nested) => {
                            return <ResultsListItem nested={nested} />;
                        })}
                    </>
                )}
        </section>
    );
};
