import React, { useState } from "react";

import { useGetGroupsByName } from "@hooks/useGetGroupsByName";
import { useInputValue } from "@hooks/useInputValue";

import { Spinner } from "@components/Spinner";
import { GroupCard } from "@components/GroupCard";
import { Pagination } from "@components/Pagination";

import { FaSearch } from "react-icons/fa";

import "./styles.css";

export const SearchGroups = () => {
  const [searchValue, setSearchValue] = useState("");
  const groupName = useInputValue("");
  const [error, setError] = useState("");
  const TAKE = 4;
  const [skip, setSkip] = useState(0);
  const { loading, groups, notFound, count } = useGetGroupsByName(
    searchValue,
    TAKE,
    skip
  );

  const handleClick = () => {
    setError("");
    if (groupName.value.length < 2) {
      setError("You have to type at least two letters to search");
      return;
    }
    setSearchValue(groupName.value);
  };

  const onReturn = (e) => {
    if (e.keyCode === 13) {
      setError("");
      if (groupName.value.length < 2) {
        setError("You have to type at least two letters to search");
        return;
      }
      setSearchValue(groupName.value);
    }
  };

  return (
    <div className="SearchGroups">
      <h2>Search Groups</h2>
      <div className="SearchInputContainer">
        <input
          type="text"
          className="SearchInput"
          placeholder="Search group by name"
          onKeyDown={onReturn}
          {...groupName}
        />
        <FaSearch className="SearchIcon" onClick={handleClick} />
      </div>
      {loading && <Spinner />}
      {!loading &&
        groups.length > 0 &&
        groups.map((group) => (
          <GroupCard key={`group-${group.id}`} group={group} />
        ))}
      <Pagination count={count} take={TAKE} setSkip={setSkip} />
      {error && <span className="errorMessage">{error}</span>}
      {notFound && <span className="errorMessage">Group not found!</span>}
    </div>
  );
};
