import React, { useState } from "react";

import { useGetGroups } from "@hooks/useGetGroups";

import { MyGroupCard } from "@components/MyGroupCard";
import { Spinner } from "@components/Spinner";
import { Pagination } from "@components/Pagination";

import "./styles.css";

export const ListGroups = () => {
  const TAKE = 4;
  const [skip, setSkip] = useState(0);
  const { groups, count, loading } = useGetGroups(TAKE, skip);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="ListGroups">
          {groups.map((group) => (
            <MyGroupCard key={group.group.id} group={group.group} />
          ))}
          <Pagination count={count} take={TAKE} setSkip={setSkip} />
          {!groups.length && <p className="EmptyGroups">You're not in any group yet...</p>}
        </div>
      )}
    </>
  );
};
