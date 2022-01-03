import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import SidebarNavigation from "./SidebarNavigation";
import SidebarAddon from "./SidebarAddon";
import SidebarSearch from "./SidebarSearch";

import Header from "./Header";
import Footer from "./Footer";

import styles from "./Sidebar.module.css";

function Sidebar(props) {
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
                    <SidebarSearch setId={setId} />
                    <SidebarAddon id={id} league={league} />
                </section>
            )}
            <footer className={styles.footer}>
                <Footer />
            </footer>
        </aside>
    );
}

export default Sidebar;
