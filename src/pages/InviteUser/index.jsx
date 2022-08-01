import React, { useContext, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

import { GroupHeader } from "@components/GroupHeader";

import { Context } from "@context/AppContext";

import { useInputValue } from "@hooks/useInputValue";

import "./styles.css";
import { PREDIKETE_API } from "../../constants";

export const InviteUser = () => {
  const { groupId } = useParams();
  const { group } = useLocation().state;
  const { jwt } = useContext(Context);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const email = useInputValue("");
  const message = useInputValue("Hey! Do you want to join us?");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const data = { message: message.value, email: email.value };
    axios
      .post(`${PREDIKETE_API}/groups/${group.id}/invite-user`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "Application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 201) {
          navigate("/success-invitation", {
            replace: true,
            state: { email: email.value, groupId },
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        if ([400, 404].some((code) => code === err.response.status)) {
          setError(err.response.data.message);
        }
        console.log(err);
      });
  };

  return (
    <div className="InviteUserContainer">
      <GroupHeader group={group} />
      <form className="InviteUserForm" onSubmit={handleSubmit}>
        <h2>Invite user</h2>
        <div className="FormItem">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...email} disabled={loading} />
        </div>
        <div className="FormItem">
          <label htmlFor="message">Message</label>
          <input type="text" id="message" {...message} disabled={loading} />
        </div>
        {error && <span className="FormError">{error}</span>}
        <button disabled={loading}>Invitar</button>
      </form>
    </div>
  );
};
