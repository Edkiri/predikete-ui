import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { Context } from "@context/AppContext";
import { PREDIKETE_API } from "../constants";

export const useGetNextPMatch = (pool) => {
  const { jwt } = useContext(Context);
  const [nextPMatch, setNextPMatch] = useState(null);
  const [teamsImages, setTeamsImages] = useState([]);

  useEffect(() => {
    if (pool) {
      const groupId = pool.membership.group.id;
      axios
        .get(`${PREDIKETE_API}/groups/${groupId}/pools/${pool.id}/next-match`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => setNextPMatch(res.data))
        .catch((err) => console.log(err));
    }
  }, [pool]);

  useEffect(() => {
    if (nextPMatch) {
      const { local, visit } = nextPMatch;
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
  }, [nextPMatch]);

  return { nextPMatch, teamsImages };
};
