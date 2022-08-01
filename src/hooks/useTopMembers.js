import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Context } from "@context/AppContext";

import { PREDIKETE_API } from "../constants";

export const useTopMembers = (group) => {
  const { jwt } = useContext(Context);
  const [topPoolMembers, setTopPoolMembers] = useState(null);

  useEffect(() => {
    if (group) {
      const URL = `${PREDIKETE_API}/groups/${group.id}/pools/top-members`;
      axios
        .get(URL, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => setTopPoolMembers(res.data))
        .catch((err) => console.log(err));
    }
  }, [group]);

  return { topPoolMembers };
};
