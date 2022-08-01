import React, { useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { Context } from "@context/AppContext";

import { GroupHeader } from "@components/GroupHeader";

import { useGetInvitation } from "@hooks/useGetInvitation";
import { useProfilePic } from "@hooks/useProfilePic";

import "./styles.css";

export const InvitationResponse = () => {
  const { jwt, removeNotification } = useContext(Context);
  const navigate = useNavigate();
  const { invitationId } = useParams();
  const { invitation } = useGetInvitation(invitationId);
  const { group } = useLocation().state;

  const { profilePic } = useProfilePic(invitation?.issuedBy);

  const handleClick = (accept) => {
    axios
      .post(
        `http://localhost:3000/groups/${invitation.group.id}/invitations/${invitation.id}`,
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
          removeNotification(invitation.id);
          navigate("/my-groups", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="InvitationResponse">
      <GroupHeader group={group} />
      <div className="InvitationContainer">
        <h2>Invitation</h2>
        <img src={profilePic} alt="" />
        <p>
          <span>{invitation?.issuedBy.username}</span> has invited you to join
          the group <span>{group.name}</span>
        </p>
        <p>"{invitation?.message}"</p>
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
