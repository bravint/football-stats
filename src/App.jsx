import { Route, Routes } from "react-router";
import { useState, useEffect } from "react";

import { Sidebar } from "./components/Sidebar/Sidebar";
import { Standings } from "./components/Standings/Standings";
import { Fixtures } from "./components/Matches/Fixtures/Fixtures";
import { Results } from "./components/Matches/Results/Results";
import { Home } from "./components/Home/Home";

import { api, apiEndpoints } from "./config";

import styles from "./styles/App.module.css";

export const App = () => {
    const [id, setId] = useState(null);
    const [league, setLeague] = useState({});
    const [fixtures, setFixtures] = useState({});
    const [teams, setTeams] = useState({});

    console.log(`states`, {
        league,
        fixtures,
        teams,
    });

    useEffect(() => {
        if (!id) return;
        const fetchLeague = async () => {
            try {
                const response = await fetch(
                    `${api.extUrl}/${id}/${apiEndpoints.standings}`,
                    fetchConfig()
                );
                const data = await response.json();
                setLeague(data);
            } catch (error) {
                console.log(`error: `, error);
            }
        };

        const fetchFixtures = async () => {
            try {
                const response = await fetch(
                    `${api.extUrl}/${id}/${apiEndpoints.matches}`,
                    fetchConfig()
                );
                const data = await response.json();
                setFixtures(data);
            } catch (error) {
                console.log(`error: `, error);
            }
        };

        const fetchTeams = async () => {
            try {
                const response = await fetch(
                    `${api.extUrl}/${id}/${apiEndpoints.teams}`,
                    fetchConfig()
                );
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.log(`error: `, error);
            }
        };

        const fetchConfig = () => {
            return {
                method: "GET",
                headers: {
                    "X-Auth-Token": `${api.token}`,
                },
            };
        };

        fetchLeague();
        fetchFixtures();
        fetchTeams();
    }, [id]);

    return (
        <div className={styles.container}>
            <Sidebar id={id} setId={setId} league={league} />
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
                        <Route
                            path="/standings"
                            element={
                                <Standings
                                    id={id}
                                    league={league}
                                    fixtures={fixtures}
                                    teams={teams}
                                />
                            }
                        />
                        <Route
                            path="/fixtures"
                            element={
                                <Fixtures
                                    id={id}
                                    league={league}
                                    fixtures={fixtures}
                                    teams={teams}
                                />
                            }
                        />
                        <Route
                            path="/results"
                            element={
                                <Results
                                    id={id}
                                    league={league}
                                    fixtures={fixtures}
                                    teams={teams}
                                />
                            }
                        />
                        <Route path="/" element={<Home setId={setId} />} />
                    </Routes>
                </main>
            )}
        </div>
    );
};
