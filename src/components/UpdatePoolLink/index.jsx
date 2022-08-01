import React from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

export const UpdatePoolLink = ({ pool }) => {
  const navigate = useNavigate();

  const navigateToUpdate = (e) => {
    navigate(`update-pool/${pool.id}`, {
      replace: true,
      state: { pool },
    });
  };

  const navigateToDetail = (e) => {
    navigate(`pool/${pool.id}`, {
      replace: true,
      state: { pool, user: pool.membership.user, userPoints: pool.points },
    });
  };

  return (
    <div className="IncompletedPoolContainer">
      {pool.completed ? (
        <button className="UpdatePoolLink" onClick={navigateToDetail}>
          My Pool
        </button>
      ) : (
        <>
          <h4>You haven't completed your predictions yet</h4>
          <button className="UpdatePoolLink" onClick={navigateToUpdate}>
            Complete Pool
          </button>
        </>
      )}
    </div>
  );
};
