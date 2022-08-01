import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Spinner } from "@components/Spinner";

import { Context } from "@context/AppContext";

import { useGetGroupPic } from "@hooks/useGetGroupPic";
import { useGetMembershipStatus } from "@hooks/useGetMembershipStatus";

import { FaArrowRight } from "react-icons/fa";

import "./styles.css";
import { PREDIKETE_API } from "../../constants";

export const GroupCard = ({ group }) => {
  const navigate = useNavigate();
  const { jwt } = useContext(Context);
  const { groupPic } = useGetGroupPic(group);
  const { loading, status, setStatus } = useGetMembershipStatus(group.id);

  const handleJoin = () => {
    if (!status.request) {
      axios
        .post(
          `${PREDIKETE_API}/groups/${group.id}/request-join`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "created") {
            setStatus({
              ...status,
              request: true,
            });
          }
        })
        .catch((er) => console.log(err));
    }
  };

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
      {!loading ? (
        status?.isMember ? (
          <FaArrowRight className="ArrowIcon" onClick={goToDetail} />
        ) : status?.request ? (
          <span className="Requested">Requested</span>
        ) : (
          <button className="JoinButton" onClick={handleJoin}>
            Join
          </button>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
};
