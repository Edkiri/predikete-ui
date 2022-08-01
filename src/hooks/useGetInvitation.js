import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Context } from "@context/AppContext";
import { PREDIKETE_API } from "../constants";

export const useGetInvitation = (invitationId) => {
  const [invitation, setInvitation] = useState(null);
  const { jwt } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${PREDIKETE_API}/notifications/invitation/${invitationId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => setInvitation(res.data))
      .catch((err) => {
        console.log(err);
        navigate("/", { replace: true });
      });
  }, [invitationId]);

  return { invitation };
};
