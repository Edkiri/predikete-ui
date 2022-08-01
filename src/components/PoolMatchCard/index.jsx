import React from "react";

import "./styles.css";

export const PoolMatchCard = ({
  poolMatch,
  teamsImages,
  handleClick = () => {},
}) => {
  const { local, visit, goalsLocal, goalsVisit } = poolMatch;
  const localImage = teamsImages.find(
    (teamImageObj) => teamImageObj.teamName === local?.name
  );
  const visitImage = teamsImages.find(
    (teamImageObj) => teamImageObj.teamName === visit?.name
  );

  const date = poolMatch.startAt || poolMatch.match.startAt;

  return (
    <>
      <div
        className="PoolMatchCardContainer"
        onClick={() => handleClick(poolMatch)}
      >
        <div className="TeamContent">
          <span>
            <img src={localImage?.teamImage} alt="" />
            {local?.name || poolMatch.localCondition}
          </span>
          <span>{goalsLocal !== null ? `${goalsLocal}` : "-"}</span>
        </div>
        <div className="TeamContent">
          <span>
            <img src={visitImage?.teamImage} alt="" />
            {visit?.name || poolMatch.visitCondition}
          </span>
          <span>{goalsVisit !== null ? `${goalsVisit}` : "-"}</span>
        </div>
        {poolMatch.match?.isFinished & poolMatch.isCalculated ? (
          <p className="Points">+{poolMatch.points} pts</p>
        ) : (
          <p className="MatchDate">{new Date(date).toLocaleDateString()}</p>
        )}
      </div>
    </>
  );
};
