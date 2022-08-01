import { useState, useEffect } from "react";
import axios from "axios";

import { DEFAULT_IMG } from "@pages/NewGroup";
import { PREDIKETE_API } from "../constants";

export const useGetGroupPic = (group) => {
  const [groupPic, setGroupPic] = useState(DEFAULT_IMG);

  useEffect(() => {
    if (group?.picture) {
      axios
        .get(`${PREDIKETE_API}/groups/group-image/${group.picture}`, {
          responseType: "blob",
        })
        .then((res) => {
          setGroupPic(URL.createObjectURL(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, [group]);

  return { groupPic };
};
