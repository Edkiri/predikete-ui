import React from "react";

import { useProfilePic } from "@hooks/useProfilePic";

import "./styles.css";

export const MembersPoolMatchLRow = ({ pMatch, teamsImages }) => {
  const { pool } = pMatch;
  const { user } = pool.membership;
  const { profilePic } = useProfilePic(user);

  const localImage = teamsImages.find(
    (teamImageObj) => teamImageObj.teamName === pMatch.local?.name
  )?.teamImage;
  const visitImage = teamsImages.find(
    (teamImageObj) => teamImageObj.teamName === pMatch.visit?.name
  )?.teamImage;

  const canCalculatePoints = Boolean(
    (pMatch.match.isFinished === true) & (pMatch.pool.completed === true)
  );

  return (
    <div className="MembersPoolMatchLRow">
      <div className="UserContainer">
        <img src={profilePic} alt="" />
        <p>{user.username}</p>
        <span>{pool.points} pts</span>
      </div>

      <div className="PMatchContainer">
        <div className="TeamContainer">
          <div className="NameContainer">
            <img src={localImage} alt="" />
            <p>{pMatch.local?.name}</p>
          </div>
          <span>
            {pMatch.goalsLocal === null ? "-" : `${pMatch.goalsLocal}`}
          </span>
        </div>
        <div className="TeamContainer">
          <div className="NameContainer">
            <img src={visitImage} alt="" />
            <p>{pMatch.visit?.name}</p>
          </div>
          <span>
            {pMatch.goalsVisit === null ? "-" : `${pMatch.goalsVisit}`}
          </span>
        </div>
      </div>

      <div className="PointsContainer">
        <span>{canCalculatePoints ? `+ ${pMatch.points} pts` : "-"}</span>
      </div>
    </div>
  );
};
