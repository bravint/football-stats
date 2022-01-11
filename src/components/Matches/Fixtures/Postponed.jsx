import { PostponedListItem } from './PostponedListItem';

import styles from '../../../styles/FixturesListItem.module.css';

export const Postponed = (props) => {
    const { postponedMatches, teams, id } = props;

    return (
        <>
            {postponedMatches.length > 1 && (
                <>
                    <h1 className={styles.title}>POSTPONED</h1>
                    {postponedMatches.map((element) => {
                        return (
                            <PostponedListItem
                                element={element}
                                key={element.id}
                                teams={teams}
                                id={id}
                            />
                        );
                    })}
                </>
            )}
        </>
    );
};
