import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GroupStats } from "@components/GroupStats";
import { PoolMatchCard } from "@components/PoolMatchCard";
import { UpdatePoolMatchModal } from "@components/UpdatePoolMatchModal";

import "./styles.css";

export const PoolMatchesGSContainer = ({
  selectedGroupName,
  GSsPoolMatches,
  updateGSPoolMatch,
  teamsImages,
  groupStagesStats,
  isDetail = false,
  pool,
}) => {
  const navigate = useNavigate();
  const [selectedPoolMatch, setSelectedPoolMatch] = useState(null);

  const GSPoolMatches = GSsPoolMatches.filter(
    (poolMatch) => poolMatch.match.groupStage.name === selectedGroupName
  );

  const jorneyOnePoolMatches = GSPoolMatches.filter(
    (poolMatch) => poolMatch.match.journey === 1
  );

  const jorneyTwoPoolMatches = GSPoolMatches.filter(
    (poolMatch) => poolMatch.match.journey === 2
  );

  const jorneyThreePoolMatches = GSPoolMatches.filter(
    (poolMatch) => poolMatch.match.journey === 3
  );

  const goToDetatil = (poolMatch) => {
    const groupId = pool.membership.group.id;
    navigate(`/group/${groupId}/pool-match-deatil/${poolMatch.id}`, {
      state: { pool },
    });
  };

  const handleClick = isDetail
    ? goToDetatil
    : (poolMatch) => setSelectedPoolMatch(poolMatch);

  return (
    <div className="GroupStageContent">
      <GroupStats
        teamsImages={teamsImages}
        groupStagesStats={groupStagesStats}
        GSPoolMatches={GSPoolMatches}
        selectedGroupName={selectedGroupName}
      />
      <p>Journey 1</p>
      <div className="PoolMatchesContainer">
        {jorneyOnePoolMatches.map((poolMatch) => (
          <PoolMatchCard
            isDetail={isDetail}
            key={poolMatch.id}
            poolMatch={poolMatch}
            teamsImages={teamsImages}
            handleClick={handleClick}
          />
        ))}
      </div>
      <p>Journey 2</p>
      <div className="PoolMatchesContainer">
        {jorneyTwoPoolMatches.map((poolMatch) => (
          <PoolMatchCard
            isDetail={isDetail}
            key={poolMatch.id}
            poolMatch={poolMatch}
            teamsImages={teamsImages}
            handleClick={handleClick}
          />
        ))}
      </div>
      <p>Journey 3</p>
      <div className="PoolMatchesContainer">
        {jorneyThreePoolMatches.map((poolMatch) => (
          <PoolMatchCard
            key={poolMatch.id}
            poolMatch={poolMatch}
            teamsImages={teamsImages}
            handleClick={handleClick}
          />
        ))}
      </div>
      {selectedPoolMatch && (
        <UpdatePoolMatchModal
          selectedPoolMatch={selectedPoolMatch}
          updatePoolMatch={updateGSPoolMatch}
          setSelectedPoolMatch={setSelectedPoolMatch}
          teamsImages={teamsImages}
        />
      )}
    </div>
  );
};
