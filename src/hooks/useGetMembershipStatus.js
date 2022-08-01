import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { Context } from "@context/AppContext";
import { PREDIKETE_API } from "../constants";

export const useGetMembershipStatus = (groupId) => {
  const { jwt } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios
      .get(`${PREDIKETE_API}/groups/${groupId}/membership-status`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setStatus(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return { loading, status, setStatus };
};
