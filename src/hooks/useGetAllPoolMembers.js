import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Context } from "@context/AppContext";
import { PREDIKETE_API } from "../constants";

export const useGetAllPoolMembers = (groupId) => {
  const { jwt } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [poolMembers, setPoolMembers] = useState([]);

  useEffect(() => {
    const URL = `${PREDIKETE_API}/groups/${groupId}/pools/all-members`;
    axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setPoolMembers(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return { loading, poolMembers };
};
