import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarAddon } from "./SidebarAddon";
import { Form } from "../SearchForm/SearchForm";

import { Header } from "./Header";
import { Footer } from "./Footer";

import styles from "../../styles/Sidebar.module.css";

export const Sidebar = (props) => {
    const { id, setId, league } = props;

    const [url, setUrl] = useState("");

    const location = useLocation();

    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    return (
        <aside className={styles.aside}>
            <header className={styles.header}>
                <Header />
            </header>
            {id && league.standings && url !== "/" && (
                <section className={styles.section}>
                    <SidebarNavigation />
                    <Form setId={setId} />
                    <SidebarAddon id={id} league={league} />
                </section>
            )}
            <footer className={styles.footer}>
                <Footer />
            </footer>
        </aside>
    );
};
