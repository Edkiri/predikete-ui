import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "@context/AppContext";

import { FaArrowDown } from "react-icons/fa";

import "./styles.css";
import { Notifications } from "@components/Notifications";

export const UserNav = () => {
  const { profilePic, user, logout } = useContext(Context);
  const [isToggled, setIsToggled] = useState(false);

  const handleLogout = () => {
    setIsToggled(false);
    logout();
  };

  return (
    <div className="UserHeaderContainer">
      {user ? (
        <>
          <div
            className={`TopUserHeaderContainer`}
            onClick={() => setIsToggled(!isToggled)}
          >
            <img className="UserAvatar" src={profilePic} alt="user avatar" />
            <span>{user.username}</span>
            <FaArrowDown className={`ToggleArrow ${isToggled && "toggled"}`} />
          </div>
          <div className={`ToggleContainer ${isToggled && "toggled"}`}>
            <ul className="UserFunctionsList">
              <Link to="/update-profile" onClick={() => setIsToggled(false)}>
                <li>Update profile</li>
              </Link>
              <button id="logout" onClick={handleLogout}>
                Logout
              </button>
            </ul>
          </div>
          <Notifications />
          {isToggled && (
            <div
              className="DarkLayout"
              onClick={() => setIsToggled(false)}
            ></div>
          )}
        </>
      ) : (
        <Link className="LoginButton" to="/login">
          Login
        </Link>
      )}
    </div>
  );
};
