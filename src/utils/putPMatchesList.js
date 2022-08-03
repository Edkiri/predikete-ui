import axios from "axios";
import { PREDIKETE_API } from "../constants";

export const putPMatchesList = async (pool, jwt, PMatchesList) => {
  const groupId = pool.membership.group.id;
  return axios
    .put(
      `${PREDIKETE_API}/groups/${groupId}/pools/${pool.id}/pool-matches`,
      { poolMatches: PMatchesList },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((err) => console.log(err));
};
