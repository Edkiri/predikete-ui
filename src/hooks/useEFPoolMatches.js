import { useEffect, useState } from "react";

export const useEFPoolMatches = (
  GSsPoolMatches,
  FPsPoolMatches,
  getPositionGroup
) => {
  const [EFPoolMatches, setEFPoolMatches] = useState([]);

  useEffect(() => {
    const newEFPoolMatches = [];
    const EFsPoolMatches = FPsPoolMatches.filter(
      (poolMatch) => poolMatch.match.phase.phase === "eighth final"
    );
    for (const EFPoolMatch of EFsPoolMatches) {
      EFPoolMatch.goalsLocal = null;
      EFPoolMatch.goalsVisit = null;
      EFPoolMatch.penalsLocal = null;
      EFPoolMatch.penalsVisit = null;
      EFPoolMatch.isPredicted = false;
      newEFPoolMatches.push(EFPoolMatch);
    }
    newEFPoolMatches.sort((a, b) => {
      return new Date(a.match.startAt) - new Date(b.match.startAt);
    });
    setEFPoolMatches(newEFPoolMatches);
  }, [GSsPoolMatches]);

  useEffect(() => {
    const newEFPoolMatches = [];
    const EFsPoolMatches = FPsPoolMatches.filter(
      (poolMatch) => poolMatch.match.phase.phase === "eighth final"
    );
    for (const EFPoolMatch of EFsPoolMatches) {
      const localCondition = EFPoolMatch.match.localCondition;
      const visitCondition = EFPoolMatch.match.visitCondition;
      EFPoolMatch.local = getPositionGroup(...localCondition.split(""));
      EFPoolMatch.visit = getPositionGroup(...visitCondition.split(""));
      newEFPoolMatches.push(EFPoolMatch);
    }
    newEFPoolMatches.sort((a, b) => {
      return (
        new Date(a.match.startAt) -
        new Date(b.match.startAt)
      );
    });
    setEFPoolMatches(newEFPoolMatches);
  }, [GSsPoolMatches, FPsPoolMatches]);

  return { EFPoolMatches };
};
