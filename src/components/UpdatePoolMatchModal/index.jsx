import React, { useState } from "react";

import { useInputValue } from "@hooks/useInputValue";

import "./styles.css";

export const UpdatePoolMatchModal = ({
  selectedPoolMatch,
  updatePoolMatch,
  setSelectedPoolMatch,
  teamsImages,
  isFPPoolMatch = false,
}) => {
  const [error, setError] = useState("");
  const { local, visit } = selectedPoolMatch;

  const goalsLocal = useInputValue(() => {
    if (selectedPoolMatch.goalsLocal === null) {
      return "";
    }
    return selectedPoolMatch.goalsLocal;
  });

  const penalsLocal = useInputValue(() => {
    if (selectedPoolMatch.penalsLocal === null) {
      return "";
    }
    return selectedPoolMatch.penalsLocal;
  });

  const goalsVisit = useInputValue(() => {
    if (selectedPoolMatch.goalsVisit === null) {
      return "";
    }
    return selectedPoolMatch.goalsVisit;
  });

  const penalsVisit = useInputValue(() => {
    if (selectedPoolMatch.penalsVisit === null) {
      return "";
    }
    return selectedPoolMatch.penalsVisit;
  });

  const localImage = teamsImages.find(
    (teamImageObj) => teamImageObj.teamName === selectedPoolMatch.local.name
  );
  const visitImage = teamsImages.find(
    (teamImageObj) => teamImageObj.teamName === selectedPoolMatch.visit.name
  );

  const someInputEmpty = Boolean(
    (goalsLocal.value === "") | (goalsVisit.value === "")
  );
  const someIsNotNumber = Boolean(
    isNaN(Number(goalsLocal.value)) |
      isNaN(Number(penalsLocal.value)) |
      isNaN(Number(goalsVisit.value)) |
      isNaN(Number(penalsVisit.value))
  );

  const isTiedMatch = Number(goalsLocal.value) === Number(goalsVisit.value);
  const displayPenalsInput = Boolean(
    isFPPoolMatch & !someInputEmpty & isTiedMatch
  );

  const handleUpdate = () => {
    setError("");
    if (someInputEmpty) {
      setError("Empty value");
      return;
    }
    if (someIsNotNumber) {
      setError("Not number value");
      return;
    }
    if (
      isTiedMatch &
      isFPPoolMatch &
      (Number(penalsLocal.value) === Number(penalsVisit.value))
    ) {
      setError("There must be a winner");
      return;
    }
    const penals = {
      penalsLocal: null,
      penalsVisit: null,
    };
    if (isTiedMatch) {
      penals.penalsLocal = Number(penalsLocal.value);
      penals.penalsVisit = Number(penalsVisit.value);
    }
    const updatedPoolMatch = {
      ...selectedPoolMatch,
      goalsLocal: Number(goalsLocal.value),
      goalsVisit: Number(goalsVisit.value),
      ...penals,
    };
    updatePoolMatch(updatedPoolMatch);
    setSelectedPoolMatch(null);
  };

  return (
    <div className="ModalContainer">
      <div className="UpdatePoolMatchModal">
        <button className="Xbtn" onClick={() => setSelectedPoolMatch(null)}>
          X
        </button>
        <div className="TeamContent">
          <span>
            <img src={localImage?.teamImage} alt="" />
            {local.name}
          </span>
          <div className="ResultContainer">
            {displayPenalsInput && (
              <input type="text" className="PenalsInput" {...penalsLocal} />
            )}
            <input type="text" {...goalsLocal} />
          </div>
        </div>
        <div className="TeamContent">
          <span>
            <img src={visitImage?.teamImage} alt="" />
            {visit.name}
          </span>
          <div className="ResultContainer">
            {displayPenalsInput && (
              <input type="text" className="PenalsInput" {...penalsVisit} />
            )}
            <input type="text" {...goalsVisit} />
          </div>
        </div>
        {error && <p className="updateErrorMessage">{error}</p>}
        <div className="ButtonsContainer">
          <button
            className="cancelBtn"
            onClick={() => setSelectedPoolMatch(null)}
          >
            Cancel
          </button>
          <button className="updateBtn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
