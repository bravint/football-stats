/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';

import { CancelledListItem } from './CancelledListItem';
import { ResultsListItem } from './ResultsListItem';

import { StoreContext } from "../../../store";

import styles from '../../../styles/FixturesListItem.module.css';

export const Results = (props) => {
    const {
        teams,
        id,
    } = props;

    const store = useContext(StoreContext);
    
    const matchStatus = store.state.matchStatus;
    const sortType = store.state.sortType;
    const filteredMatches = store.state.filteredMatches;
    const cancelledMatches = store.state.cancelledMatches;

    return (
        <section className={styles.results}>
            {cancelledMatches.length > 1 && (
                <>
                    <h1 className={styles.title}>CANCELLED</h1>
                    <CancelledListItem
                        cancelledMatches={cancelledMatches}
                        teams={teams}
                        id={id}
                    />
                </>
            )}
            {filteredMatches &&
                (cancelledMatches.length < 1 || matchStatus === 'all') && (
                    <>
                        <h1 className={styles.title}>RESULTS</h1>
                        {filteredMatches.map((nested) => {
                            return (
                                <>
                                    <ResultsListItem
                                        nested={nested}
                                        sortType={sortType}
                                        teams={teams}
                                        id={id}
                                    />
                                </>
                            );
                        })}
                    </>
                )}
        </section>
    );
};
