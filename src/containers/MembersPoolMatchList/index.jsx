import React from "react";

import { MembersPoolMatchLRow } from "@components/MembersPoolMatchLRow";

import "./styles.css";

export const MembersPoolMatchList = ({ pMatches, teamsImages }) => {
  return (
    <div className="MembersPoolMatchList">
      {pMatches.map((pMatch) => (
        <MembersPoolMatchLRow
          key={pMatch.id}
          pMatch={pMatch}
          teamsImages={teamsImages}
        />
      ))}
    </div>
  );
};
