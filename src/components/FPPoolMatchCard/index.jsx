import React, { useState } from "react";

import { ModalMessage } from "@components/ModalMessage";

import "./styles.css";

export const FPPoolMatchCard = ({
  pMatch,
  teamsImages,
  isEFinal = false,
  handleClick = () => {},
}) => {
  const {
    local,
    visit,
    goalsLocal,
    goalsVisit,
    penalsLocal,
    penalsVisit,
    match,
  } = pMatch;
  const [displayMessageModal, setDisplayMessageModal] = useState(false);

  const localImage = teamsImages.find(
    (teamImageObj) => teamImageObj.teamName === local?.name
  );
  const visitImage = teamsImages.find(
    (teamImageObj) => teamImageObj.teamName === visit?.name
  );

  return (
    <>
      <div
        className="PoolMatchCardContainer"
        onClick={() => handleClick(pMatch)}
      >
        {isEFinal && (
          <p>{`${match.localCondition} vs ${match.visitCondition}`}</p>
        )}
        <div className="Content">
          <div className="TeamContent">
            <span>
              {local ? (
                <>
                  <img src={localImage?.teamImage} alt="" />
                  {local?.name}
                </>
              ) : (
                <>
                  <span>{match.localCondition}</span>
                </>
              )}
            </span>
            <div className="ResultContainer">
              <span className="Penals">{penalsLocal}</span>
              <span>{goalsLocal}</span>
            </div>
          </div>
          <div className="TeamContent">
            <span>
              {visit ? (
                <>
                  <img src={visitImage?.teamImage} alt="" />
                  {visit?.name}
                </>
              ) : (
                <>
                  <span>{match.visitCondition}</span>
                </>
              )}
            </span>
            <div className="ResultContainer">
              <span className="Penals">{penalsVisit}</span>
              <span>{goalsVisit}</span>
            </div>
          </div>
        </div>
        <p className="MatchDate">
          {new Date(match.startAt).toLocaleDateString()}
        </p>
      </div>
      {displayMessageModal && (
        <ModalMessage
          title={"Teams not defined yet"}
          message={"You haven´t predicted all matches yet"}
          closeModal={() => setDisplayMessageModal(false)}
        />
      )}
    </>
  );
};
