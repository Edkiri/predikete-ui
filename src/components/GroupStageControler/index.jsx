import React, { useState } from "react";

import { ModalMessage } from "@components/ModalMessage";

import "./styles.css";

export const GroupStageControler = ({
  selectedGroupName,
  setSelectedGroupName,
  GSsPoolMatches,
  finalPhase,
  setFinalPhase,
}) => {
  const [displayModal, setDisplayModal] = useState(false);

  const groupsNames = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const GSCompleted = !GSsPoolMatches?.some((poolMatch) => {
    return (
      (poolMatch.match.groupStage !== null) & (poolMatch.isPredicted === false)
    );
  });

  const handleFinalPhase = () => {
    if (!GSCompleted) {
      for (const groupName of groupsNames) {
        const auxPoolMatches = GSsPoolMatches.filter((poolMatch) => {
          return (
            (poolMatch.match.groupStage !== null) &
            (poolMatch.match.groupStage?.name === groupName)
          );
        });
        if (
          auxPoolMatches.some((poolMatch) => poolMatch.isPredicted === false)
        ) {
          setSelectedGroupName(groupName);
          setDisplayModal(true);
          return;
        }
      }
    } else {
      setFinalPhase(true);
    }
  };

  const handleClick = (group) => {
    setSelectedGroupName(group);
    setFinalPhase(false);
  };

  return (
    <div className="GroupStageContainer">
      <div className="GroupStageControlerContainer">
        <h5>Group Stage</h5>
        <div className="ButtonsContainer">
          {groupsNames.map((group) => (
            <div key={group} className="GroupButtonContainer">
              <button
                className={`GroupButton ${
                  (selectedGroupName === group) & (finalPhase === false) &&
                  "selected"
                }`}
                onClick={() => handleClick(group)}
              >
                {group}
              </button>
            </div>
          ))}
        </div>
        <button
          className={`FinalPhaseButton ${GSCompleted && "completed"} ${
            finalPhase && "selected"
          }`}
          onClick={handleFinalPhase}
        >
          Final phase
        </button>
        {displayModal && (
          <ModalMessage
            title={"Group Stage Incomplete"}
            message={"Group stage matches are not completed yet"}
            closeModal={() => setDisplayModal(false)}
          />
        )}
      </div>
    </div>
  );
};
