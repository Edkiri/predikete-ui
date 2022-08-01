import { useEffect, useState } from "react";

import { getMatchWinner } from "@utils/getMatchWinner";

export const useQFPoolMatches = (
  GSsPoolMatches,
  FPsPoolMatches,
  EFPoolMatches
) => {
  const [QFPoolMatches, setQFPoolMatches] = useState([]);

  useEffect(() => {
    const newQFPoolMatches = [];
    const QFsPoolMatches = FPsPoolMatches.filter(
      (poolMatch) => poolMatch.match.phase.phase === "quarters final"
    );
    for (const QFPoolMatch of QFsPoolMatches) {
      QFPoolMatch.goalsLocal = null;
      QFPoolMatch.goalsVisit = null;
      QFPoolMatch.penalsLocal = null;
      QFPoolMatch.penalsVisit = null;
      QFPoolMatch.local = null;
      QFPoolMatch.visit = null;
      QFPoolMatch.isPredicted = false;
      newQFPoolMatches.push(QFPoolMatch);
    }
    newQFPoolMatches.sort((a, b) => {
      return (
        new Date(a.match.startAt) -
        new Date(b.match.startAt)
      );
    });
    setQFPoolMatches(newQFPoolMatches);
  }, [GSsPoolMatches]);

  useEffect(() => {
    const auxQFPoolMatches = FPsPoolMatches.filter(
      (PMatch) => PMatch.match.phase.phase === "quarters final"
    );
    for (const PMatch of EFPoolMatches) {
      if (PMatch.isPredicted) {
        const { localCondition, visitCondition } = PMatch.match;
        const winnerTeam = getMatchWinner(PMatch);
        const QFCondition = `${localCondition}/${visitCondition}`;
        const PMatchToUpdate = auxQFPoolMatches.find((pMatch) => {
          return (
            (pMatch.match.localCondition === QFCondition) |
            (pMatch.match.visitCondition === QFCondition)
          );
        });
        if (PMatchToUpdate.match.localCondition === QFCondition) {
          PMatchToUpdate.local = winnerTeam;
        } else {
          PMatchToUpdate.visit = winnerTeam;
        }
      }
    }
    auxQFPoolMatches.sort((a, b) => {
      return (
        new Date(a.match.startAt) -
        new Date(b.match.startAt)
      );
    });
    setQFPoolMatches(auxQFPoolMatches);
  }, [EFPoolMatches]);

  return { QFPoolMatches };
};
