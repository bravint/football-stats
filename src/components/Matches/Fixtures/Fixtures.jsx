/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';

import { FixturesListItem } from './FixturesListItem';
import { PostponedListItem } from './PostponedListItem';

import { StoreContext, initialState } from '../../../store';

import styles from '../../../styles/Matches.module.css';

export const Fixtures = () => {
    const store = useContext(StoreContext);

    const { filteredFixtures, matchStatus, postponedMatches } = store.state;

    return (
        <section className={styles.table}>
            {!!postponedMatches.length && (
                <>
                    <h1 className={styles.title}>POSTPONED</h1>
                    <ul>
                        <PostponedListItem />
                    </ul>
                </>
            )}
            {filteredFixtures &&
                (!postponedMatches.length || matchStatus === initialState.matchStatus) && (
                    <>
                        <h1 className={styles.title}>SCHEDULED</h1>
                        <ul>
                            {filteredFixtures.map((fixtures) => <FixturesListItem fixtures={fixtures} />)}
                        </ul>
                    </>
                )}
        </section>
    );
};
