import axios from "axios";
import { useState, useEffect, useContext } from "react";

import { Context } from "@context/AppContext";
import { PREDIKETE_API } from "../constants";

export const useGetPool = (groupId) => {
  const { jwt } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [pool, setPool] = useState(null);

  useEffect(() => {
    axios
      .get(`${PREDIKETE_API}/groups/${groupId}/pools`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setPool(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err), setLoading(false);
      });
  }, [groupId]);

  return { loading, pool };
};
