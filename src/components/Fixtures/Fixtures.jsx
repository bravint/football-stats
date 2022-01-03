/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import FixturesListItem from "./FixturesListItem"

import {api, apiEndpoints} from "../../config"

function Fixtures(props) {
    const { id } = props
    
    const [fixtures, setFixtures] = useState({});

    console.log(`states:`, {
        fixtures,
    });

    if (fixtures) console.log(fixtures.matches)

    useEffect(() => {
        fetchFixtures();
    }, [id]);

    const fetchFixtures = async () => {
        try {
            const response = await fetch(
                `${api.extUrl}/${id}/${apiEndpoints.matches}`,
                {
                    method: "GET",
                    headers: {
                        "X-Auth-Token": `${api.token}`,
                    },
                }
            );
            const data = await response.json();
            console.log(`data fetched: `, data);
            setFixtures(data);
        } catch (error) {
            console.log(`error: `, error);
        }
    };
    
    return (
        <>
            {id && fixtures.matches && (
            <section className="table">
                <FixturesListItem fixtures={fixtures} />
            </section>
            )}
        </>
    );
}

export default Fixtures