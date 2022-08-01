import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Context } from "@context/AppContext";
import { PREDIKETE_API } from "../constants";

export const useGetFPsPoolMatches = (group, poolId) => {
  const [FPsPoolMatches, setFPsPoolMatches] = useState([]);
  const { jwt } = useContext(Context);

  useEffect(() => {
    const URL = `${PREDIKETE_API}/groups/${group.id}/pools/${poolId}/fp-pool-matches`;
    axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => setFPsPoolMatches(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateFPPoolMatch = (payload) => {
    const oldFPsPoolMatches = FPsPoolMatches.filter(
      (poolMatch) => poolMatch.id !== payload.id
    );
    const oldFPsPoolMatchIndex = FPsPoolMatches.findIndex(
      (poolMatch) => poolMatch.id === payload.id
    );
    const updatedFPPoolMatches = { ...payload, isPredicted: true };
    const newFPsPoolMatches = [...oldFPsPoolMatches];
    newFPsPoolMatches.splice(oldFPsPoolMatchIndex, 0, updatedFPPoolMatches);
    setFPsPoolMatches(newFPsPoolMatches);
  };

  return { FPsPoolMatches, updateFPPoolMatch };
};
