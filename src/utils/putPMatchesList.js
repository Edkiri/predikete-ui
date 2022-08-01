import axios from "axios";

export const putPMatchesList = async (pool, jwt, PMatchesList) => {
  const groupId = pool.membership.group.id;
  return axios
    .put(
      `http://localhost:3000/groups/${groupId}/pools/${pool.id}/pool-matches`,
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
