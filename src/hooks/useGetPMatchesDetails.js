import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Context } from "@context/AppContext";
import { PREDIKETE_API } from "../constants";

export const useGetPMatchesDetails = (pool, poolMatchId) => {
  const { jwt } = useContext(Context);
  const groupId = pool.membership.group.id;

  const [loading, setLoading] = useState(true);
  const [pMatches, setPMatches] = useState([]);
  const [teamsImages, setTeamsImages] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${PREDIKETE_API}/groups/${groupId}/pools/pool-match/${poolMatchId}/points`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        const pMatches = res.data.sort((a, b) => {
          return b.points - a.points;
        });
        setPMatches(pMatches);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (pMatches.length > 0) {
      const { local, visit } = pMatches[0].match;
      let teams = [];
      if (local !== null) {
        teams.push(local);
      }
      if (visit !== null) {
        teams.push(visit);
      }
      for (const pMatch of pMatches) {
        if (!teams.some((team) => team?.id === pMatch.local?.id)) {
          if (pMatch.local !== null) {
            teams.push(pMatch.local);
          }
        }
        if (!teams.some((team) => team?.id === pMatch.visit?.id)) {
          if (pMatch.visit !== null) {
            teams.push(pMatch.visit);
          }
        }
      }
      const teamsImagesPromises = teams.map((team) => {
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
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [pMatches]);

  return { loading, pMatches, teamsImages };
};
