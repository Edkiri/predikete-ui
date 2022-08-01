import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

import { Context } from "@context/AppContext";

import { DEFAULT_IMG } from "@pages/NewGroup";

import { GroupHeader } from "@components/GroupHeader";

import { FaUpload } from "react-icons/fa";

import "./styles.css";
import { PREDIKETE_API } from "../../constants";

export const UpdateGroup = () => {
  const { groupId } = useParams();
  const { group } = useLocation().state;
  const { jwt } = useContext(Context);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [picture, setPicture] = useState("");
  const [currentPicture, setCurrentPicture] = useState("");

  useEffect(() => {
    if (group) {
      setName(group.name);
      setAbout(group?.about || "");
      if (group?.picture) {
        axios
          .get(`${PREDIKETE_API}/groups/group-image/${group.picture}`, {
            responseType: "blob",
          })
          .then((res) => {
            setCurrentPicture(URL.createObjectURL(res.data));
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
      setCurrentPicture(DEFAULT_IMG);
      setLoading(false);
    }
  }, [group]);

  const handleImageChange = (e) => {
    setPicture(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCurrentPicture(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    if (picture) {
      formData.append("picture", picture, picture.name);
    }
    axios
      .put(`${PREDIKETE_API}/groups/${groupId}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          navigate(`/group/${groupId}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="UpdateGroupContainer">
      <GroupHeader group={group} />
      <form className="UpdateGroupForm" onSubmit={handleSubmit}>
        <h2>Update Info</h2>
        <figure className="CurrentPictureContainer">
          <img className="CurrentPicture" src={currentPicture} alt="" />
        </figure>
        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/*"
          onChange={handleImageChange}
        />
        <label
          className={`UploadButton ${loading && "is-disabled"}`}
          htmlFor="picture"
        >
          <FaUpload />
          <span>Choose a Photo</span>
        </label>
        <div className="FormItem">
          <label htmlFor="">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="FormItem">
          <label htmlFor="">About</label>
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            disabled={loading}
          />
        </div>
        {loading && <span>Loading...</span>}
        <button>Update</button>
      </form>
    </div>
  );
};
