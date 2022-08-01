import React from "react";
import { useNavigate } from "react-router-dom";

import { FPPoolMatchesContainer } from "@components/FPPoolMatchesContainer";
import { FPPoolMatchCard } from "@components/FPPoolMatchCard";

import "./styles.css";

export const MyPoolMatchesFinalPhase = ({
  FPsPoolMatches,
  teamsImages,
  pool,
}) => {
  const navigate = useNavigate();
  const groupId = pool.membership.group.id;

  const goToPoolMatchDetail = (pMatch) => {
    navigate(`/group/${groupId}/pool-match-deatil/${pMatch.id}`, {
      state: { pool },
    });
  };

  const EFPoolMatches = FPsPoolMatches.filter((pMatch) => {
    return pMatch.match.phase.phase === "eighth final";
  });

  const QFPoolMatches = FPsPoolMatches.filter((pMatch) => {
    return pMatch.match.phase.phase === "quarters final";
  });

  const SFPoolMatches = FPsPoolMatches.filter((pMatch) => {
    return pMatch.match.phase.phase === "semi final";
  });

  const FinalPoolMatch = FPsPoolMatches.find(
    (PMatch) => PMatch.match.phase.phase === "final"
  );

  const TAFinalPoolMatch = FPsPoolMatches.find(
    (PMatch) => PMatch.match.phase.phase === "third and fourth"
  );

  return (
    <>
      <div className="MyPoolMatchesFinalPhase">
        <FPPoolMatchesContainer
          title={"Eighth Finals"}
          PoolMatches={EFPoolMatches}
          teamsImages={teamsImages}
          handleClick={goToPoolMatchDetail}
        />
        <FPPoolMatchesContainer
          title={"Quarters Finals"}
          PoolMatches={QFPoolMatches}
          teamsImages={teamsImages}
          handleClick={goToPoolMatchDetail}
        />
        <FPPoolMatchesContainer
          title={"Semi Finals"}
          PoolMatches={SFPoolMatches}
          teamsImages={teamsImages}
          handleClick={goToPoolMatchDetail}
        />
        <div className="FinalsContainer">
          <h4>Third and Fourth</h4>
          <FPPoolMatchCard
            pMatch={TAFinalPoolMatch}
            teamsImages={teamsImages}
            handleClick={goToPoolMatchDetail}
          />
          <h4>Final</h4>
          <FPPoolMatchCard
            pMatch={FinalPoolMatch}
            teamsImages={teamsImages}
            handleClick={goToPoolMatchDetail}
          />
        </div>
      </div>
    </>
  );
};
