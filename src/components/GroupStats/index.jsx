import React from "react";

import { TeamGroupStatsRow } from "@components/TeamGroupStatsRow";

import "./styles.css";

export const GroupStats = ({
  teamsImages,
  groupStagesStats,
  selectedGroupName,
}) => {
  const GSStats = groupStagesStats.find(
    (item) => item.groupName === selectedGroupName
  );
  return (
    <div className="GroupStatsContainer">
      <div className="HeaderGroupStatsRow">
        <span>Team</span>
        <span>PTS</span>
        <span>GP</span>
        <span>W</span>
        <span>L</span>
        <span>D</span>
        <span>GF</span>
        <span>GA</span>
        <span>GD</span>
      </div>
      {GSStats?.stats.map((teamStats) => (
        <TeamGroupStatsRow
          key={`teamStat-${teamStats.team.name}`}
          teamsImages={teamsImages}
          teamStats={teamStats}
        />
      ))}
    </div>
  );
};
