/* eslint-disable react-hooks/exhaustive-deps */
import { StandingsListItem } from "./StandingsListItem";

export const Standings = (props) => {
    const { id, standings } = props;

    return (
        <>
            {id && standings.standings && (
                <section className="table">
                    <StandingsListItem standings={standings} id={id} />
                </section>
            )}
        </>
    );
};
