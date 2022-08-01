import React from "react";
import { useLocation } from "react-router-dom";

import { GroupHeader } from "@components/GroupHeader";
import { MemberCard } from "@components/MemberCard";

import { useGetAllPoolMembers } from "@hooks/useGetAllPoolMembers";

import "./styles.css";

export const AllPoolMembers = () => {
  const { pool } = useLocation().state;
  const { loading, poolMembers } = useGetAllPoolMembers(
    pool.membership.group.id
  );
  return (
    <div className="AllPoolMembersContainer">
      <GroupHeader group={pool.membership.group} />
      <h2>All pool members</h2>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div className="MemberList">
          {poolMembers?.map((member, index) => (
            <MemberCard
              key={member.id}
              pool={pool}
              memberPool={member}
              position={index + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
