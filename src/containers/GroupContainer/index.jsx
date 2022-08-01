import React from "react";
import { useParams } from "react-router-dom";

import { useGetPool } from "@hooks/useGetPool";

import { GroupHeader } from "@components/GroupHeader";

import "./styles.css";

export const GroupContainer = ({ children }) => {
  const { groupId } = useParams();
  const { loading, pool } = useGetPool(groupId);

  return (
    <div className="GroupContainer">
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <GroupHeader group={pool.membership.group} />
          {children}
        </>
      )}
    </div>
  );
};
