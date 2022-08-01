import React, { useContext, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

import { Context } from "@context/AppContext";

import { GroupHeader } from "@components/GroupHeader";

import { useGetRequest } from "@hooks/useGetRequest";
import { useProfilePic } from "@hooks/useProfilePic";

import "./styles.css";
import { PREDIKETE_API } from "../../constants";

export const JoinResponse = () => {
  const { jwt, removeNotification } = useContext(Context);
  const navigate = useNavigate();
  const { requestId } = useParams();
  const { request } = useGetRequest(requestId);
  const { profilePic } = useProfilePic(request?.user);
  const [posting, setPosting] = useState(false);
  const { group } = useLocation().state;

  const handleClick = (accept) => {
    if (!posting) {
      setPosting(true);
      const groupId = request.group.id;
      axios
        .post(
          `${PREDIKETE_API}/groups/${groupId}/requests/${request?.id}`,
          { accept },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Context-Type": "Application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            removeNotification(request.id);
            setPosting(false);
            navigate(`/group/${groupId}`, { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
          setPosting(false);
        });
    }
  };

  return (
    <div className="JoinResponse">
      <GroupHeader group={group} />
      <div className="RequestContainer">
        <h2>Request to join</h2>
        <img src={profilePic} alt="" />
        <p>
          <span>{request?.issuedBy.username}</span> wants to join the group
        </p>
        <div className="ButtonsContainer">
          <button
            type="button"
            className="CancelBtn"
            onClick={() => handleClick(false)}
          >
            Reject
          </button>
          <button
            type="button"
            className="AcceptBtn"
            onClick={() => handleClick(true)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
