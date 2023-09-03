import { useContext } from 'react';

import { StoreContext } from '../../store';

import styles from '../../styles/Sidebar.module.css';

export const SidebarLeagueOverview = () => {
    const store = useContext(StoreContext);

    const { id, league: { competition, area, season, standings } } = store.state;

    return (
        <>
            <ul>
                <li>
                    <img
                        src={
                            process.env.PUBLIC_URL + `/assets/images/${id}.svg`
                        }
                        alt="league logo"
                        className={styles.navLogo}
                    />
                </li>
                <li>
                    <p className={styles.competitionOverview}>
                        {competition.name}
                    </p>
                </li>
                <li>
                    <p className={styles.competitionOverview}>
                        {area.name}
                    </p>
                </li>
                <br></br>
                <li>
                    <p className={styles.competitionOverview}>
                        Playing Matchday:<br></br>
                        {season.currentMatchday} of{' '}
                        {standings.length * 2 - 2}
                    </p>
                </li>
            </ul>
        </>
    );
};
