import { useContext } from 'react';
import { StoreContext } from '../../store';

import { StandingsListItem } from './StandingsListItem';

export const Standings = () => {
    const store = useContext(StoreContext);

    const { id, league: { standings } } = store.state;

    return id && standings && <StandingsListItem />;
};
