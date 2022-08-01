import React from "react";
import { useLocation, useParams } from "react-router-dom";

import { MembersPoolMatchList } from "@containers/MembersPoolMatchList";

import { PoolMatchCard } from "@components/PoolMatchCard";
import { GroupHeader } from "@components/GroupHeader";

import { useGetPMatchesDetails } from "@hooks/useGetPMatchesDetails";

import "./styles.css";

export const PoolMatchDetail = () => {
  const { poolMatchId } = useParams();
  const { pool } = useLocation().state;

  const { loading, pMatches, teamsImages } = useGetPMatchesDetails(
    pool,
    poolMatchId
  );

  const match = pMatches?.find((pMatch) => pMatch)?.match;

  return (
    <>
      <GroupHeader group={pool.membership.group} />
      <div className="PoolMatchDetailContainer">
        <h2>Match Details</h2>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <PoolMatchCard poolMatch={match} teamsImages={teamsImages} />
            <MembersPoolMatchList
              pMatches={pMatches}
              teamsImages={teamsImages}
            />
          </>
        )}
      </div>
    </>
  );
};
