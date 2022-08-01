import React from "react";
import { useNavigate } from "react-router-dom";

import { useGetPreviusPMatch } from "@hooks/useGetPreviusPMatch";

import "./styles.css";

export const PreviusMatch = ({ pool }) => {
  const { previusMatch, teamsImages } = useGetPreviusPMatch(pool);
  const navigate = useNavigate();

  const localImage = teamsImages.find(
    (teamImageObj) => teamImageObj.teamName === previusMatch?.match.local.name
  );
  const visitImage = teamsImages.find(
    (teamImageObj) => teamImageObj.teamName === previusMatch?.match.visit.name
  );

  const handleClick = () => {
    navigate(`pool-match-deatil/${previusMatch?.id}`, { state: { pool } });
  };

  const date = previusMatch?.match.startAt;

  return (
    <>
      {previusMatch ? (
        <div className="PoolMatchCardContainer previus" onClick={handleClick}>
          <p>Previus Match</p>
          <div className="TeamContent">
            <span>
              <img src={localImage?.teamImage} alt="" />
              {previusMatch?.match.local.name}
            </span>
            <span>{previusMatch?.match.goalsLocal}</span>
          </div>
          <div className="TeamContent">
            <span>
              <img src={visitImage?.teamImage} alt="" />
              {previusMatch?.match.visit.name}
            </span>
            <span>{previusMatch?.match.goalsVisit}</span>
          </div>
          {previusMatch?.match?.isFinished & previusMatch?.isCalculated ? (
            <p className="Points">+{previusMatch.points} pts</p>
          ) : (
            <p className="MatchDate">{new Date(date).toLocaleDateString()}</p>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
