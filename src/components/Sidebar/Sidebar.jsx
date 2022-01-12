import { SidebarLeagueOverview } from "./SidebarLeagueOverview";
import { SidebarNavigation } from "./SidebarNavigation";
import { Form } from "../SearchForm/SearchForm";
import { Header } from "./Header";
import { Footer } from "./Footer";

import styles from "../../styles/Sidebar.module.css";

export const Sidebar = (props) => {
    const { id, setId, standings, url } = props;

    return (
        <aside className={styles.aside}>
            <header className={styles.header}>
                <Header />
            </header>
            {id && standings.standings && url !== "/" && (
                <section className={styles.section}>
                    <SidebarNavigation setId={setId} url={url}/>
                    <Form setId={setId} />
                    <SidebarLeagueOverview id={id} standings={standings}/>
                </section>
            )}
            <footer className={styles.footer}>
                <Footer />
            </footer>
        </aside>
    );
};
