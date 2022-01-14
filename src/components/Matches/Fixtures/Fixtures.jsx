/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';

import { FixturesListItem } from './FixturesListItem';
import { PostponedListItem } from './PostponedListItem';

import { StoreContext, initialState } from '../../../store';

import styles from '../../../styles/Matches.module.css';

export const Fixtures = () => {
    const store = useContext(StoreContext);

    const { filteredMatches, matchStatus, postponedMatches } = store.state;

    return (
        <section className={styles.results}>
            {postponedMatches.length > 1 && (
                <>
                    <h1 className={styles.title}>POSTPONED</h1>
                    <PostponedListItem />
                </>
            )}
            {filteredMatches &&
                (postponedMatches.length < 1 ||
                    matchStatus === initialState.matchStatus) && (
                    <>
                        <h1 className={styles.title}>SCHEDULED</h1>
                        {filteredMatches.map((nested) => {
                            return <FixturesListItem nested={nested} />;
                        })}
                    </>
                )}
        </section>
    );
};
