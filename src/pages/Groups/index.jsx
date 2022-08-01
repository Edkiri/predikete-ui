import React from "react";

import { ListGroups } from "@containers/ListGroups";

import "./styles.css";
import { Link } from "react-router-dom";

export const Groups = () => {
  return (
    <div className="GroupsContainer">
      <h2 className="GroupsTitle">My groups</h2>
      <div className="LinksContainer">
        <Link className="NewGroupLink" to="/new-group">
          New group...
        </Link>
        <Link className="SearchGroupLink" to="/search-groups">
          Search...
        </Link>
      </div>
      <ListGroups />
    </div>
  );
};
