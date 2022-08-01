import React, { useContext, useState } from "react";

import { Context } from "@context/AppContext";

import { UserNav } from "@components/UserNav";
import { AppNav } from "@components/AppNav";

import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import logo from "@assets/main-logo.png";

import "./styles.css";

export const Header = () => {
  const { user } = useContext(Context);
  const [displayedNav, setDisplayedNav] = useState(false);

  return (
    <header className="Header">
      <img className="logo" src={logo} alt="" />
      <div className="HeaderRight">
        {!displayedNav && <UserNav user={user} />}
        <div
          className="MenuIcon"
          onClick={() => setDisplayedNav(!displayedNav)}
        >
          {displayedNav ? <FaTimes /> : <FaBars />}
        </div>
      </div>
      {displayedNav && <AppNav hideMenu={() => setDisplayedNav(false)} />}
    </header>
  );
};
