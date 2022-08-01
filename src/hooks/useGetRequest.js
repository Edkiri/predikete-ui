import { useContext, useEffect, useState } from "react";

import { Context } from "@context/AppContext";
import axios from "axios";
import { PREDIKETE_API } from "../constants";

export const useGetRequest = (requestId) => {
  const { jwt } = useContext(Context);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axios
      .get(`${PREDIKETE_API}/groups/requests/${requestId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => setRequest(res.data))
      .catch((err) => console.log(err));
  }, []);

  return { request };
};
