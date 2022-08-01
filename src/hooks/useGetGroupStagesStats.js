import { useEffect, useState } from "react";

import { useCalculateGSTeamStats } from "@hooks/useCalculateGSTeamStats";

export const useGetGroupStagesStats = (groupStages, poolMatches) => {
  const [groupStagesStats, setGroupStagesStats] = useState([]);

  useEffect(() => {
    if (poolMatches?.length) {
      const newGroupStagesStats = groupStages.map((groupStage) => {
        const GSPoolMatches = poolMatches.map(
          (poolMatch) => poolMatch.match.groupStage?.name === groupStage.name
        );
        const { GSStats } = useCalculateGSTeamStats(poolMatches);
      });
    }
  }, [poolMatches]);

  return groupStagesStats;
};
