import React from "react";

import { GroupControlMenu } from "@components/GroupControlMenu";

import { useGetGroupPic } from "@hooks/useGetGroupPic";

import "./styles.css";
import { Link } from "react-router-dom";

export const GroupHeader = ({ group }) => {
  const { groupPic } = useGetGroupPic(group);
  return (
    <div className="GroupContainerHeaderLayout">
      <div className="GroupContainerHeader">
        <Link to={`/group/${group.id}`}>
          <img src={groupPic} alt="" />
        </Link>
        <div className="HeaderRight">
          <div className="TitleContainer">
            <h4>{group?.name}</h4>
            <GroupControlMenu group={group} />
          </div>
          <p>{group?.about}</p>
        </div>
      </div>
    </div>
  );
};
