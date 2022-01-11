import { CancelledListItem } from './CancelledListItem';
import { ResultsListItem } from './ResultsListItem';

import styles from '../../../styles/FixturesListItem.module.css';

export const Results = (props) => {
    const {
        filteredMatches,
        teams,
        id,
        cancelledMatches,
        matchStatus,
        sortType,
    } = props;

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
