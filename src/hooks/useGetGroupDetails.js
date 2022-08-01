import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Context } from "@context/AppContext";
import { PREDIKETE_API } from "../constants";

export const useGetGroupDetails = (groupId) => {
  const { jwt } = useContext(Context);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    axios
      .get(`${PREDIKETE_API}/groups/${groupId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setGroup(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return { group };
};
