import { useContext } from "react";
import { StoreContext } from "../../store";

import { StandingsListItem } from "./StandingsListItem";

export const Standings = () => {
    const store = useContext(StoreContext);

    const id = store.state.id;
    const standings = store.state.standings;

    return (
        <>
            {id && standings.standings && (
                <section className="table">
                    <StandingsListItem  />
                </section>
            )}
        </>
    );
};
