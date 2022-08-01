import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { Context } from "@context/AppContext";
import { PREDIKETE_API } from "../constants";

export const useGetGroupsByName = (groupName, take, skip) => {
  const { jwt } = useContext(Context);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (groupName) {
      setNotFound(false);
      setLoading(true);
      setCount(0);
      axios
        .get(`${PREDIKETE_API}/groups/find-by-name`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          params: {
            groupName,
            take,
            skip,
          },
        })
        .then((res) => {
          setGroups(res.data.data);
          setCount(res.data.count);
          if (res.data.count === 0) {
            setNotFound(true);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [groupName, skip]);

  return { loading, groups, notFound, count };
};
