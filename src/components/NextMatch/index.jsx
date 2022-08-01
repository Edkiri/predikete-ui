import React from "react";
import { useNavigate } from "react-router-dom";

import { useGetNextPMatch } from "@hooks/useGetNextPMatch";

import "./styles.css";

export const NextMatch = ({ pool }) => {
  const { nextPMatch, teamsImages } = useGetNextPMatch(pool);
  const navigate = useNavigate();

  const localImage = teamsImages.find(
    (teamImageObj) => teamImageObj.teamName === nextPMatch?.match.local.name
  );
  const visitImage = teamsImages.find(
    (teamImageObj) => teamImageObj.teamName === nextPMatch?.match.visit.name
  );

  const handleClick = () => {
    navigate(`pool-match-deatil/${nextPMatch?.id}`, { state: { pool } });
  };

  console.log(nextPMatch);

  return (
    <div className="PoolMatchCardContainer next" onClick={handleClick}>
      <p className="title">Next Match</p>
      <div className="TeamContent">
        <span>
          <img src={localImage?.teamImage} alt="" />
          {nextPMatch?.match.local.name}
        </span>
      </div>
      <div className="TeamContent">
        <span>
          <img src={visitImage?.teamImage} alt="" />
          {nextPMatch?.match.visit.name}
        </span>
      </div>
      <p className="MatchDate">
        {new Date(nextPMatch?.match.startAt).toLocaleDateString()}
      </p>
    </div>
  );
};
