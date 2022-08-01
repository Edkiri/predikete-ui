import axios from "axios";
import { useEffect, useState } from "react";
import { PREDIKETE_API } from "../constants";

export const useGetTeamsImages = (teams = []) => {
  const [teamsImages, setTeamsImages] = useState([]);

  useEffect(() => {
    const teamsImagesPromises = teams.map((team) => {
      if (team !== undefined) {
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
      }
    });
    if (teams.length > 0) {
      Promise.all(teamsImagesPromises)
        .then((data) => {
          setTeamsImages(data);
        })
        .catch((err) => console.log(err));
    }
  }, [teams]);

  return { teamsImages };
};
