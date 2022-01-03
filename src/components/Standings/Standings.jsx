/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { api, apiEndpoints } from "../../config";

import StandingsListItem from "./StandingsListItem";

function Standings(props) {
    const { id, league, setLeague } = props;

    const navigate = useNavigate();

    const redirectToHome = () => navigate("/", { replace: true });

    useEffect(() => {
        fetchLeague();
    }, [id]);

    const fetchLeague = async () => {
        try {
            const response = await fetch(
                `${api.extUrl}/${id}/${apiEndpoints.standings}`,
                {
                    method: "GET",
                    headers: {
                        "X-Auth-Token": `${api.token}`,
                    },
                }
            );
            const data = await response.json();
            setLeague(data);
        } catch (error) {
            console.log(`error: `, error);
        }
    };

    return (
        <>
            {id && league.standings && (
                <section className="table">
                    <StandingsListItem league={league} />
                </section>
            )}
            {(!id || !league.standings) && redirectToHome()}
        </>
    );
}

export default Standings;
