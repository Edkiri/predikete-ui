import React from "react";
import { useParams } from "react-router-dom";

import { useGetPool } from "@hooks/useGetPool";

import { TopPoolMembers } from "@containers/TopPoolMembers";

import { GroupHeader } from "@components/GroupHeader";
import { UpdatePoolLink } from "@components/UpdatePoolLink";
import { NextMatch } from "@components/NextMatch";
import { PreviusMatch } from "@components/PreviusMatch";

import "./styles.css";

export const GroupDetail = () => {
  const { groupId } = useParams();
  const { loading, pool } = useGetPool(groupId);

  return (
    <div className="GroupContainer">
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <GroupHeader group={pool.membership.group} />
          <UpdatePoolLink pool={pool} />
          <TopPoolMembers group={pool.membership.group} pool={pool} />
          <div className="PoolContent">
            <PreviusMatch pool={pool} />
            <NextMatch pool={pool} />
          </div>
        </>
      )}
    </div>
  );
};
