import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

export const AppNav = ({ hideMenu }) => {
  return (
    <nav className="Menu">
      <ul>
        <Link onClick={hideMenu} to="/">Home</Link>
        <Link onClick={hideMenu} to="/my-groups">My groups</Link>
        <Link onClick={hideMenu} to="/search-groups">Search</Link>
        <Link onClick={hideMenu} to="/rules">Rules</Link>
      </ul>
    </nav>
  );
};
