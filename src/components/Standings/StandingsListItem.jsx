import { useState } from "react";

import TeamStats from "./StandingsDetailedStats";

import "../../styles/StandingsListItem.css";

function StandingsListItem(props) {
    const { league } = props;

    const [teamId, setTeamId] = useState(null);

    const onClickHandler = (id) => teamId !== id ? setTeamId(id) : setTeamId(null);

    if (league)
        return (
            <ul>
                <li className="standings list-title">
                    <section className="postion-stats">
                        <p></p>
                    </section>
                    <section className="team-stats">
                        <p></p>
                        <p>Team name</p>
                    </section>
                    <section className="games-stats">
                        <p>P</p>
                        <p>W</p>
                        <p>D</p>
                        <p>L</p>
                    </section>
                    <section className="goals-stats">
                        <p>F</p>
                        <p>A</p>
                        <p>+-</p>
                    </section>
                    <section className="points-stats">
                        <p>Pts</p>
                    </section>
                </li>
                {league.standings[0].table.map((element) => {
                    return (
                        <li
                            className="team-list"
                            key={element.team.id}
                            id={element.team.id}
                            onClick={() => onClickHandler(element.team.id)}
                        >
                            <div className="standings">
                                <section className="postion-stats">
                                    <p>{element.position}</p>
                                </section>
                                <section className="team-stats">
                                    <img
                                        src={element.team.crestUrl}
                                        alt="club logo"
                                        className="club-logo"
                                    ></img>
                                    <p>{element.team.name}</p>
                                </section>
                                <section className="games-stats">
                                    <p>{element.playedGames}</p>
                                    <p>{element.won}</p>
                                    <p>{element.draw}</p>
                                    <p>{element.lost}</p>
                                </section>
                                <section className="goals-stats">
                                    <p>{element.goalsFor}</p>
                                    <p>{element.goalsAgainst}</p>
                                    <p>{element.goalDifference}</p>
                                </section>
                                <section className="points-stats">
                                    <p>{element.points}</p>
                                </section>
                            </div>
                            {teamId === element.team.id && (
                                <TeamStats element={element} />
                            )}
                        </li>
                    );
                })}
            </ul>
        );
}

export default StandingsListItem;
