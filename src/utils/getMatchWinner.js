export const getMatchWinner = (PMatch) => {
  const { goalsLocal, goalsVisit, local, visit, penalsLocal, penalsVisit } =
    PMatch;
  if (goalsLocal > goalsVisit) {
    return local;
  } else if (goalsLocal < goalsVisit) {
    return visit;
  } else {
    if (penalsLocal > penalsVisit) {
      return local;
    } else {
      return visit;
    }
  }
};
