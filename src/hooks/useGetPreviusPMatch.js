import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Context } from "@context/AppContext";
import { PREDIKETE_API } from "../constants";

export const useGetPreviusPMatch = (pool) => {
  const { jwt } = useContext(Context);
  const [previusMatch, setPreviusPMatch] = useState(null);
  const [teamsImages, setTeamsImages] = useState([]);

  useEffect(() => {
    if (pool) {
      const groupId = pool.membership.group.id;
      axios
        .get(
          `${PREDIKETE_API}/groups/${groupId}/pools/${pool.id}/previus-match`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((res) => setPreviusPMatch(res.data))
        .catch((err) => console.log(err));
    }
  }, [pool]);

  useEffect(() => {
    if (previusMatch) {
      const { local, visit } = previusMatch;
      const teamsImagesPromises = [local, visit].map((team) => {
        return axios
          .get(`${PREDIKETE_API}/teams/images/${team.image}`, {
            responseType: "blob",
          })
          .then((res) => {
            return {
              teamName: team.name,
              teamImage: URL.createObjectURL(res.data),
            };
          })
          .catch((err) => console.log(err));
      });
      Promise.all(teamsImagesPromises)
        .then((data) => {
          setTeamsImages(data);
        })
        .catch((err) => console.log(err));
    }
  }, [previusMatch]);

  return { previusMatch, teamsImages };
};
