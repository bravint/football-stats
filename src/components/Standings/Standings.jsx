import { useContext } from 'react';
import { StoreContext } from '../../store';

import { StandingsListItem } from './StandingsListItem';

import styles from '../../styles/Standings.module.css';

export const Standings = () => {
    const store = useContext(StoreContext);

    const { id, standings } = store.state;

    return (
        <>
            {id && standings.standings && (
                <ul className={styles.table}>
                    <StandingsListItem />
                </ul>
            )}
        </>
    );
};
