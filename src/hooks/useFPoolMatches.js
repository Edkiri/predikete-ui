import { useEffect, useState } from "react";

import { getMatchWinner } from "@utils/getMatchWinner";

export const useFPoolMatches = (
  GSsPoolMatches,
  FPsPoolMatches,
  SFPoolMatches
) => {
  const [FPoolMatches, setFPoolMatches] = useState([]);

  useEffect(() => {
    const newFPoolMatches = [];
    const FPoolMatches = FPsPoolMatches.filter((poolMatch) =>
      ["third and fourth", "final"].includes(poolMatch.match.phase.phase)
    );
    for (const FPoolMatch of FPoolMatches) {
      FPoolMatch.goalsLocal = null;
      FPoolMatch.goalsVisit = null;
      FPoolMatch.penalsLocal = null;
      FPoolMatch.penalsVisit = null;
      FPoolMatch.local = null;
      FPoolMatch.visit = null;
      FPoolMatch.isPredicted = false;
      newFPoolMatches.push(FPoolMatch);
    }
    setFPoolMatches(newFPoolMatches);
  }, [GSsPoolMatches]);

  useEffect(() => {
    const FsPoolMatches = FPsPoolMatches.filter((poolMatch) =>
      ["third and fourth", "final"].includes(poolMatch.match.phase.phase)
    );
    for (const PMatch of SFPoolMatches) {
      if (PMatch.isPredicted) {
        const finalPMatch = FsPoolMatches.find(
          (PMatch) => PMatch.match.phase.phase === "final"
        );
        const TAFPMatch = FsPoolMatches.find(
          (PMatch) => PMatch.match.phase.phase === "third and fourth"
        );
        const winnerTeam = getMatchWinner(PMatch);
        const looserTeam =
          winnerTeam.id === PMatch.local.id ? PMatch.visit : PMatch.local;
        if (!finalPMatch.local) {
          finalPMatch.local = winnerTeam;
          TAFPMatch.local = looserTeam;
        } else {
          finalPMatch.visit = winnerTeam;
          TAFPMatch.visit = looserTeam;
        }
      }
    }
    setFPoolMatches(FsPoolMatches);
  }, [SFPoolMatches]);

  const FPoolMatch = FPoolMatches.find(
    (PMatch) => PMatch.match.phase.phase === "final"
  );

  const TAFPoolMatch = FPoolMatches.find(
    (PMatch) => PMatch.match.phase.phase === "third and fourth"
  );

  return { FPoolMatches };
};
