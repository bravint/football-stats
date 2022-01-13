import { useContext } from 'react';

import { Header } from './Header';
import { Footer } from './Footer';
import { SearchForm } from '../SearchForm/SearchForm';
import { SidebarLeagueOverview } from './SidebarLeagueOverview';
import { SidebarNavigation } from './SidebarNavigation';

import { StoreContext } from '../../store';

import styles from '../../styles/Sidebar.module.css';

export const Sidebar = () => {
    const store = useContext(StoreContext);

    const { id, standings, url } = store.state;

    return (
        <aside className={styles.aside}>
            <header className={styles.header}>
                <Header />
            </header>
            {id && standings.standings && url !== '/' && (
                <section className={styles.section}>
                    <SidebarNavigation />
                    <SearchForm />
                    <SidebarLeagueOverview />
                </section>
            )}
            <footer className={styles.footer}>
                <Footer />
            </footer>
        </aside>
    );
};
