import React from "react";

import { FPPoolMatchCard } from "@components/FPPoolMatchCard";

import "./styles.css";

export const FPPoolMatchesContainer = ({
  title,
  PoolMatches = [],
  teamsImages,
  updateFPPoolMatch,
  handleClick,
}) => {
  return (
    <div className="PFPoolMatches">
      <h4>{title}</h4>
      <div className="FPPoolMatchesContainer">
        {PoolMatches.map((pMatch) => (
          <FPPoolMatchCard
            key={pMatch.id}
            pMatch={pMatch}
            teamsImages={teamsImages}
            updateFPPoolMatch={updateFPPoolMatch}
            isEFinal={title === "Eighth Finals"}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};
