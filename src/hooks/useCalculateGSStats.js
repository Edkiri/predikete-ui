import { useEffect, useState } from "react";

export const useCalculateGSStats = (GSsPoolMatches, groupStages) => {
  const [GSStats, setGSStats] = useState([]);

  useEffect(() => {
    const initStats = groupStages.map((groupStage) => {
      return {
        groupName: groupStage.name,
        stats: groupStage.teams.map((team) => ({
          team,
          played: 0,
          points: 0,
          wins: 0,
          losses: 0,
          ties: 0,
          goalsScored: 0,
          goalsReceived: 0,
        })),
      };
    });
    if (GSsPoolMatches?.length) {
      for (const groupStage of groupStages) {
        const GSPoolMatches = GSsPoolMatches.filter((poolMatch) => {
          return (
            (poolMatch.match.groupStage.name === groupStage.name) &
            (poolMatch.isPredicted === true)
          );
        });
        const groupStats = initStats.find(
          (item) => item.groupName === groupStage.name
        );
        for (const poolMatch of GSPoolMatches) {
          const local = poolMatch.local;
          const visit = poolMatch.visit;
          const statsLocal = groupStats.stats.find(
            (item) => item.team.name === local.name
          );
          const statsVisit = groupStats.stats.find(
            (item) => item.team.name === visit.name
          );
          // Played
          statsLocal.played += 1;
          statsVisit.played += 1;
          // Local Goals
          statsLocal.goalsReceived += Number(poolMatch.goalsVisit);
          statsLocal.goalsScored += Number(poolMatch.goalsLocal);
          // Visit Goals
          statsVisit.goalsReceived += Number(poolMatch.goalsLocal);
          statsVisit.goalsScored += Number(poolMatch.goalsVisit);
          // Calculate Points
          if (poolMatch.goalsLocal > poolMatch.goalsVisit) {
            statsLocal.wins += 1;
            statsLocal.points += 3;
            statsVisit.losses += 1;
          } else if (poolMatch.goalsLocal < poolMatch.goalsVisit) {
            statsVisit.wins += 1;
            statsVisit.points += 3;
            statsLocal.losses += 1;
          } else {
            statsLocal.ties += 1;
            statsLocal.points += 1;
            statsVisit.ties += 1;
            statsVisit.points += 1;
          }
          groupStats.stats.sort((a, b) => {
            if (b.points !== a.points) {
              return b.points - a.points;
            } else {
              const aGoalsDiff = a.goalsScored - a.goalsReceived;
              const bGoalsDiff = b.goalsScored - b.goalsReceived;
              if (bGoalsDiff !== aGoalsDiff) {
                return bGoalsDiff - aGoalsDiff;
              } else {
                if (b.goalsScored !== a.goalsScored) {
                  return b.goalsScored - a.goalsScored;
                } else {
                  const againstMatch = getAgainstMatch(
                    GSPoolMatches,
                    a.teamName,
                    b.teamName
                  );
                  return (
                    Number(againstMatch?.goalsVisit) -
                    Number(againstMatch?.goalsLocal)
                  );
                }
              }
            }
          });
        }
      }
    }
    setGSStats(initStats);
  }, [GSsPoolMatches]);

  const getPositionGroup = (position, groupName) => {
    const groupStage = GSStats.find((gs) => gs.groupName === groupName);
    return groupStage.stats[position - 1].team;
  };

  return { groupStagesStats: GSStats, getPositionGroup };
};

const getAgainstMatch = (GSPoolMatches, team1, team2) => {
  const auxTeamList = [team1, team2];
  const againstMatch = GSPoolMatches.find((poolMatch) => {
    const { match } = poolMatch;
    return (
      auxTeamList.includes(match.local.name) &
      auxTeamList.includes(match.visit.name)
    );
  });
  return againstMatch;
};
