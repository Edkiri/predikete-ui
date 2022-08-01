import React from "react";
import { useNavigate } from "react-router-dom";

import { useProfilePic } from "@hooks/useProfilePic";

import "./styles.css";

export const MemberCard = ({ pool, memberPool, position }) => {
  const { user } = memberPool.membership;
  const { profilePic } = useProfilePic(user);
  const navigate = useNavigate();

  const handleClick = () => {
    const groupId = pool.membership.group.id;
    navigate(`/group/${groupId}/pool/${memberPool.id}`, {
      state: { pool, user, userPoints: memberPool.points },
    });
  };

  return (
    <div className="MemberCard" onClick={handleClick}>
      <div className="MemberCardLeft">
        <span className="Position">{position}.</span>
        <img src={profilePic} alt="" />
        <span>{user?.username}</span>
      </div>
      <span className="MemberPoints">{memberPool.points} pts</span>
    </div>
  );
};
