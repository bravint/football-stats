import { Postponed } from './Postponed';
import { FixturesListItem } from './FixturesListItem';

import styles from '../../../styles/FixturesListItem.module.css';

export const Fixtures = (props) => {
    const {
        filteredMatches,
        teams,
        id,
        postponedMatches,
        matchStatus,
        sortType,
    } = props;

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
