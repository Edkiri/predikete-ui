import React, { useState } from "react";

import { FPPoolMatchesContainer } from "@components/FPPoolMatchesContainer";
import { FPPoolMatchCard } from "@components/FPPoolMatchCard";
import { ModalMessage } from "@components/ModalMessage";
import { UpdatePoolMatchModal } from "@components/UpdatePoolMatchModal";

import { useEFPoolMatches } from "@hooks/useEFPoolMatches";
import { useQFPoolMatches } from "@hooks/useQFPoolMatches";
import { useSFPoolMatches } from "@hooks/useSFPoolMatches";
import { useFPoolMatches } from "@hooks/useFPoolMatches";

import { formatPMatchesList } from "@utils/formatPMatchesList";

import { FaAngleLeft } from "react-icons/fa";

import "./styles.css";

export const PoolMatchesFinalPhase = ({
  GSsPoolMatches,
  getPositionGroup,
  updateFPPoolMatch,
  FPsPoolMatches,
  teamsImages,
  onUpdate,
}) => {
  const [updating, setUpdating] = useState(false);
  const [displayMessageModal, setDisplayMessageModal] = useState(false);
  const [selectedPoolMatch, setSelectedPoolMatch] = useState(null);

  const { EFPoolMatches } = useEFPoolMatches(
    GSsPoolMatches,
    FPsPoolMatches,
    getPositionGroup
  );
  const { QFPoolMatches } = useQFPoolMatches(
    GSsPoolMatches,
    FPsPoolMatches,
    EFPoolMatches
  );
  const { SFPoolMatches } = useSFPoolMatches(
    GSsPoolMatches,
    FPsPoolMatches,
    QFPoolMatches
  );
  const { FPoolMatches } = useFPoolMatches(
    GSsPoolMatches,
    FPsPoolMatches,
    SFPoolMatches
  );

  const FinalPoolMatch = FPoolMatches.find(
    (PMatch) => PMatch.match.phase.phase === "final"
  );
  const TAFinalPoolMatch = FPoolMatches.find(
    (PMatch) => PMatch.match.phase.phase === "third and fourth"
  );

  const FPsPMatchesCompleted = !FPsPoolMatches.some(
    (PMatch) => PMatch.isPredicted === false
  );

  const handleUpdate = () => {
    if (FPsPMatchesCompleted) {
      setUpdating(true);
      const PMatchesToPut = formatPMatchesList([
        ...GSsPoolMatches,
        ...FPsPoolMatches,
      ]);
      onUpdate(PMatchesToPut, setUpdating);
    } else {
      setDisplayMessageModal(true);
    }
  };

  const handleClick = (pMatch) => {
    if ((pMatch.local === null) | (pMatch.visit === null)) {
      setDisplayMessageModal(true);
      return;
    }
    setSelectedPoolMatch(pMatch);
  };

  return (
    <div className="PoolMatchesFinalPhase">
      <FPPoolMatchesContainer
        title={"Eighth Finals"}
        PoolMatches={EFPoolMatches}
        teamsImages={teamsImages}
        updateFPPoolMatch={updateFPPoolMatch}
        handleClick={handleClick}
      />
      <FPPoolMatchesContainer
        title={"Quarters Finals"}
        PoolMatches={QFPoolMatches}
        teamsImages={teamsImages}
        updateFPPoolMatch={updateFPPoolMatch}
        handleClick={handleClick}
      />
      <FPPoolMatchesContainer
        title={"Semi Finals"}
        PoolMatches={SFPoolMatches}
        teamsImages={teamsImages}
        updateFPPoolMatch={updateFPPoolMatch}
        handleClick={handleClick}
      />
      {FPoolMatches?.length > 0 && (
        <div className="FinalsContainer">
          <h4>Third and Fourth</h4>
          <FPPoolMatchCard
            pMatch={TAFinalPoolMatch}
            teamsImages={teamsImages}
            updateFPPoolMatch={updateFPPoolMatch}
            handleClick={handleClick}
          />
          <h4>Final</h4>
          <FPPoolMatchCard
            pMatch={FinalPoolMatch}
            teamsImages={teamsImages}
            updateFPPoolMatch={updateFPPoolMatch}
            handleClick={handleClick}
          />
        </div>
      )}
      <button
        className={`saveButton ${updating && "disabled"}`}
        onClick={handleUpdate}
        disabled={updating}
      >
        Save
      </button>
      {selectedPoolMatch && (
        <UpdatePoolMatchModal
          selectedPoolMatch={selectedPoolMatch}
          setSelectedPoolMatch={setSelectedPoolMatch}
          teamsImages={teamsImages}
          updatePoolMatch={updateFPPoolMatch}
          isFPPoolMatch={true}
        />
      )}
      {displayMessageModal && (
        <ModalMessage
          title={"Imcomplete Matches"}
          message={"You need to predict all matches before saving"}
          closeModal={() => setDisplayMessageModal(false)}
        />
      )}
    </div>
  );
};
