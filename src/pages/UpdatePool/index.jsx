import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Context } from "@context/AppContext";

import { useLocalStorage } from "@hooks/useLocalStorage";
import { useGetGSPoolMatches } from "@hooks/useGetGSPoolMatches";
import { useCalculateGSStats } from "@hooks/useCalculateGSStats";
import { useGetTeamsImages } from "@hooks/useGetTeamsImages";
import { useGetFPsPoolMatches } from "@hooks/useGetFPsPoolMatches";

import { GroupHeader } from "@components/GroupHeader";
import { GroupStageControler } from "@components/GroupStageControler";
import { PoolMatchesGSContainer } from "@components/PoolMatchesGSContainer";
import { PoolMatchesFinalPhase } from "@components/PoolMatchesFinalPhase";

import { putPMatchesList } from "@utils/putPMatchesList";

import "./styles.css";

export const UpdatePool = () => {
  const { pool } = useLocation().state;
  const { jwt } = useContext(Context);
  const navigate = useNavigate();
  const [GSPoolMatches, setGSPoolMatches] = useLocalStorage(
    `pool-${pool.id}`,
    []
  );
  const { loading, GSsPoolMatches, updateGSPoolMatch } = useGetGSPoolMatches(
    pool.membership.group,
    pool.id,
    GSPoolMatches,
    setGSPoolMatches
  );
  const [selectedGroupName, setSelectedGroupName] = useState("A");

  const { groupStagesStats, getPositionGroup } = useCalculateGSStats(
    GSsPoolMatches,
    pool.tournament.groupStages
  );
  const { teamsImages } = useGetTeamsImages(pool.tournament.teams);

  const [finalPhase, setFinalPhase] = useState(false);
  const { FPsPoolMatches, updateFPPoolMatch } = useGetFPsPoolMatches(
    pool.membership.group,
    pool.id
  );

  const randomizePoolMatches = () => {
    const newPoolMatch = GSsPoolMatches.find(
      (poolMatch) =>
        (poolMatch.isPredicted === false) &
        (poolMatch.match.groupStage !== null)
    );
    if (newPoolMatch) {
      newPoolMatch.goalsLocal = Math.floor(Math.random() * 11);
      newPoolMatch.goalsVisit = Math.floor(Math.random() * 11);
      updateGSPoolMatch(newPoolMatch);
    }
  };

  const handleUpdatePMatches = (PMatchesList, setUpdating) => {
    putPMatchesList(pool, jwt, PMatchesList)
      .then((res) => {
        if (res.status === 200) {
          window.localStorage.removeItem(`pool-${pool.id}`);
          navigate(`/group/${pool.membership.group.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
        setUpdating(false);
      });
  };

  return (
    <>
      <GroupHeader group={pool.membership.group} />
      <div className="UpdatePoolContainer">
        <h2>Update Pool</h2>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <GroupStageControler
              selectedGroupName={selectedGroupName}
              setSelectedGroupName={setSelectedGroupName}
              GSsPoolMatches={GSsPoolMatches}
              finalPhase={finalPhase}
              setFinalPhase={setFinalPhase}
            />
            {!finalPhase ? (
              <>
                <button onClick={randomizePoolMatches}>
                  Randomize PoolMatches
                </button>
                <PoolMatchesGSContainer
                  updateGSPoolMatch={updateGSPoolMatch}
                  GSsPoolMatches={GSsPoolMatches}
                  groupStagesStats={groupStagesStats}
                  teamsImages={teamsImages}
                  finalPhase={finalPhase}
                  setFinalPhase={setFinalPhase}
                  selectedGroupName={selectedGroupName}
                  pool={pool}
                />
              </>
            ) : (
              <PoolMatchesFinalPhase
                GSsPoolMatches={GSsPoolMatches}
                FPsPoolMatches={FPsPoolMatches}
                updateFPPoolMatch={updateFPPoolMatch}
                getPositionGroup={getPositionGroup}
                teamsImages={teamsImages}
                onUpdate={handleUpdatePMatches}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};
