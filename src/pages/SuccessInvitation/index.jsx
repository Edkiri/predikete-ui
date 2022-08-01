import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./styles.css";

export const SuccessInvitation = () => {
  const location = useLocation();
  const { email, groupId } = location.state;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/group/${groupId}`, { replace: true });
  };

  return (
    <div className="SuccessInvitation">
      <h4>Your invitation has been successfully sent to <span>{email}</span></h4>
      <button onClick={handleClick}>Confirm</button>
    </div>
  );
};
