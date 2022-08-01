import React from "react";

import { useGetGroupPic } from "@hooks/useGetGroupPic";

import { FaArrowRight } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export const MyGroupCard = ({ group }) => {
  const navigate = useNavigate();
  const { groupPic } = useGetGroupPic(group);

  const goToDetail = () => {
    navigate(`/group/${group.id}`);
  };

  return (
    <div className="GroupCard">
      <div className="GroupCardContainer">
        <div className="GroupCardHeader">
          <img className="GroupPicture" src={groupPic} />
          <div className="ContentContainer">
            <h4 className="GroupTitle">{group.name}</h4>
            <p className="GroupAbout">{group.about}</p>
          </div>
        </div>
      </div>
      <FaArrowRight className="ArrowIcon" onClick={goToDetail} />
    </div>
  );
};
