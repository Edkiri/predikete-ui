import { useContext, useEffect, useState } from "react";
import { Context } from "@context/AppContext";
import axios from "axios";
import { PREDIKETE_API } from "../constants";

export const useGetGSPoolMatches = (
  group,
  poolId,
  GSPoolMatches,
  setGSPoolMatches
) => {
  const { jwt } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const updateGSPoolMatch = (payload) => {
    const oldPoolMatches = GSPoolMatches.filter(
      (poolMatch) => poolMatch.id !== payload.id
    );
    const oldPoolMatchIndex = GSPoolMatches.findIndex(
      (poolMatch) => poolMatch.id === payload.id
    );
    const updatedPoolMatches = { ...payload, isPredicted: true };
    const newGSPoolMatches = [...oldPoolMatches];
    newGSPoolMatches.splice(oldPoolMatchIndex, 0, updatedPoolMatches);
    setGSPoolMatches(newGSPoolMatches);
  };

  useEffect(() => {
    if (!GSPoolMatches.length) {
      setLoading(true);
      axios
        .get(
          `${PREDIKETE_API}/groups/${group.id}/pools/${poolId}/gs-pool-matches`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((res) => {
          setGSPoolMatches(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [poolId]);

  return { loading, GSsPoolMatches: GSPoolMatches, updateGSPoolMatch };
};
