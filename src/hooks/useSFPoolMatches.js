import { useEffect, useState } from "react";

import { getMatchWinner } from "@utils/getMatchWinner";

export const useSFPoolMatches = (
  GSsPoolMatches,
  FPsPoolMatches,
  QFPoolMatches
) => {
  const [SFPoolMatches, setSFPoolMatches] = useState([]);

  useEffect(() => {
    const newSFPoolMatches = [];
    const SFsPoolMatches = FPsPoolMatches.filter(
      (poolMatch) => poolMatch.match.phase.phase === "semi final"
    );
    for (const SFPoolMatch of SFsPoolMatches) {
      SFPoolMatch.goalsLocal = null;
      SFPoolMatch.goalsVisit = null;
      SFPoolMatch.penalsLocal = null;
      SFPoolMatch.penalsVisit = null;
      SFPoolMatch.local = null;
      SFPoolMatch.visit = null;
      SFPoolMatch.isPredicted = false;
      newSFPoolMatches.push(SFPoolMatch);
    }
    newSFPoolMatches.sort((a, b) => {
      return new Date(a.match.startAt) - new Date(b.match.startAt);
    });
    setSFPoolMatches(newSFPoolMatches);
  }, [GSsPoolMatches]);

  useEffect(() => {
    const auxSFPoolMatches = FPsPoolMatches.filter(
      (PMatch) => PMatch.match.phase.phase === "semi final"
    );
    for (const PMatch of QFPoolMatches) {
      if (PMatch.isPredicted) {
        const { localCondition, visitCondition } = PMatch.match;
        const winnerTeam = getMatchWinner(PMatch);
        const SFCondition = `${localCondition}-${visitCondition}`;
        const PMatchToUpdate = auxSFPoolMatches.find((pMatch) => {
          return (
            (pMatch.match.localCondition === SFCondition) |
            (pMatch.match.visitCondition === SFCondition)
          );
        });
        if (PMatchToUpdate.match.localCondition === SFCondition) {
          PMatchToUpdate.local = winnerTeam;
        } else {
          PMatchToUpdate.visit = winnerTeam;
        }
      }
    }
    auxSFPoolMatches.sort((a, b) => {
      return (
        new Date(a.match.startAt) -
        new Date(b.match.startAt)
      );
    });
    setSFPoolMatches(auxSFPoolMatches);
  }, [QFPoolMatches]);

  return { SFPoolMatches };
};
