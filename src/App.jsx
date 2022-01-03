import { Route, Routes } from "react-router";
import { useState } from "react";

import Sidebar from './components/Sidebar/Sidebar'

import Standings from "./components/Standings/Standings";
import Fixtures from "./components/Fixtures/Fixtures";
import Results from "./components/Results/Results";
import Home from "./components/Home/Home";

import styles from "./styles/App.module.css";
import "./styles/reset.css";

function App() {
    const [id, setId] = useState(null);
    const [league, setLeague] = useState({});

    return (
        <div className={styles.container}>
                <Sidebar id={id} setId={setId} league={league}/>
            {!id && (
                <main className={styles.main}>
                    <Routes>
                        <Route path="/" element={<Home setId={setId} />} />
                    </Routes>
                </main>
            )}
            {id && (
                <main className={styles.main}>
                    <Routes>
                        <Route path="/standings" element={<Standings id={id} league={league} setLeague={setLeague}/>}/>
                        <Route path="/fixtures" element={<Fixtures id={id} />}/>
                        <Route path="/results" element={<Results id={id} />} />
                        <Route path="/" element={<Home setId={setId} />} />
                    </Routes>
                </main>
            )}
        </div>
    );
}

export default App;
