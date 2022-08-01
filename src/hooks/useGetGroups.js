import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Context } from "@context/AppContext";
import { PREDIKETE_API } from "../constants";

export const useGetGroups = (take, skip) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const { jwt } = useContext(Context);

  useEffect(() => {
    axios
      .get(`${PREDIKETE_API}/groups`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          take,
          skip,
        },
      })
      .then((res) => {
        setGroups(res.data.data);
        setCount(res.data.count);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [skip]);

  return { groups, count, loading };
};
