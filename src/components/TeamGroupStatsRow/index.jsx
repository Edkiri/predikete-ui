import React from "react";

import "./styles.css";

export const TeamGroupStatsRow = ({ teamsImages, teamStats }) => {
  const teamImage = teamsImages.find(
    (teamImg) => teamImg.teamName === teamStats.team.name
  );
  return (
    <div className="TeamGroupStatsRow">
      <span className="TeamName">
        <img src={teamImage?.teamImage} alt="" />
        {teamStats.team.name}
      </span>
      <span>{teamStats?.points}</span>
      <span>{teamStats?.played}</span>
      <span>{teamStats?.wins}</span>
      <span>{teamStats?.losses}</span>
      <span>{teamStats?.ties}</span>
      <span>{teamStats?.goalsScored}</span>
      <span>{teamStats?.goalsReceived}</span>
      <span>{(teamStats?.goalsScored - teamStats?.goalsReceived) | 0}</span>
    </div>
  );
};
