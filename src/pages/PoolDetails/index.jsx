import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { MyPoolMatchesFinalPhase } from "@containers/MyPoolMatchesFinalPhase";

import { GroupHeader } from "@components/GroupHeader";
import { PoolMatchesGSContainer } from "@components/PoolMatchesGSContainer";
import { GroupStageControler } from "@components/GroupStageControler";

import { useProfilePic } from "@hooks/useProfilePic";
import { useGetGSPoolMatches } from "@hooks/useGetGSPoolMatches";
import { useGetTeamsImages } from "@hooks/useGetTeamsImages";
import { useGetFPsPoolMatches } from "@hooks/useGetFPsPoolMatches";
import { useCalculateGSStats } from "@hooks/useCalculateGSStats";

import "./styles.css";

export const PoolDetails = () => {
  const { pool, user, userPoints } = useLocation().state;
  const { poolId } = useParams();
  const group = pool.membership.group;
  const { profilePic } = useProfilePic(user);

  const [GSPoolMatches, setGSPoolMatches] = useState([]);
  const { loading, GSsPoolMatches } = useGetGSPoolMatches(
    group,
    poolId,
    GSPoolMatches,
    setGSPoolMatches
  );

  const { teamsImages } = useGetTeamsImages(pool.tournament.teams);
  const { groupStagesStats } = useCalculateGSStats(
    GSsPoolMatches,
    pool.tournament.groupStages
  );
  const [selectedGroupName, setSelectedGroupName] = useState("A");

  const { FPsPoolMatches } = useGetFPsPoolMatches(group, poolId);
  const [finalPhase, setFinalPhase] = useState(false);

  return (
    <>
      <GroupHeader group={pool.membership.group} />
      <div className="MyPoolContainer">
        <h2>Pool Details</h2>
        <div className="MemberContainer">
          <div className="MemberInfoContainer">
            <img src={profilePic} alt="" />
            <p>{user.username}</p>
          </div>
          <span>{userPoints} pts</span>
        </div>
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
              <PoolMatchesGSContainer
                selectedGroupName={selectedGroupName}
                GSsPoolMatches={GSsPoolMatches}
                groupStagesStats={groupStagesStats}
                teamsImages={teamsImages}
                isDetail={true}
                pool={pool}
              />
            ) : (
              <>
                <MyPoolMatchesFinalPhase
                  FPsPoolMatches={FPsPoolMatches}
                  teamsImages={teamsImages}
                  pool={pool}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
