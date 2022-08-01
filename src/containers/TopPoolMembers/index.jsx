import React, { useEffect, useState } from "react";

import { useTopMembers } from "@hooks/useTopMembers";

import { MemberCard } from "@components/MemberCard";

import { FaArrowDown } from "react-icons/fa";

import "./styles.css";
import { Link } from "react-router-dom";

export const TopPoolMembers = ({ group, pool }) => {
  const { topPoolMembers } = useTopMembers(group);

  return (
    <div className="MemberList">
      <h5>Top 3</h5>
      {topPoolMembers?.map((member, index) => (
        <MemberCard
          key={member.id}
          pool={pool}
          memberPool={member}
          position={index + 1}
        />
      ))}
      <Link to="all-members" className="SeeAllLink" state={{ pool }}>
        <span className="SeeAll">See All</span>
        <FaArrowDown className="SeeAllArrow" />
      </Link>
    </div>
  );
};
