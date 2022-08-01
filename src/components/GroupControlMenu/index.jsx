import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "@context/AppContext";

import { FaUserPlus } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

import "./styles.css";

export const GroupControlMenu = ({ group }) => {
  const { user } = useContext(Context);
  const [isGroupAdmin, setIsGroupAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (group) {
      const userMembership = group.memberships.find(
        (membership) => membership.user.id === user.id
      );
      setIsGroupAdmin(userMembership?.is_admin);
    }
  }, [group]);

  const goToInviteUser = () => {
    navigate(`/group/${group.id}/invite-user`, {
      replace: true,
      state: { group },
    });
  };

  const goToUpdate = () => {
    navigate(`/update-group/${group.id}`, {
      replace: true,
      state: { group },
    });
  };

  return (
    <div className="GroupControlMenu">
      {isGroupAdmin && (
        <>
          <div onClick={goToInviteUser} className="addMemberButtonContainer">
            <FaUserPlus className="addMemberButton" />
          </div>
          <div onClick={goToUpdate} className="UpdateGroupLink">
            <FaCog className="UpdateGroupLinkIcon" />
          </div>
        </>
      )}
    </div>
  );
};
