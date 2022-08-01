export const formatPMatchesList = (PMatches) => {
  return PMatches.map((PMatch) => {
    const { goalsLocal, goalsVisit, penalsLocal, penalsVisit } = PMatch;
    return {
      poolMatchId: PMatch.id,
      localId: PMatch.local.id,
      visitId: PMatch.visit.id,
      goalsLocal,
      goalsVisit,
      penalsLocal,
      penalsVisit,
    };
  });
};
