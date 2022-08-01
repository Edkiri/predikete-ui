import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Context } from "@context/AppContext";

import { useInputValue } from "@hooks/useInputValue";

import { FaUpload } from "react-icons/fa";

import { PREDIKETE_API } from "../../constants";

import "./styles.css";

export const ProfileUpdate = () => {
  const { user, jwt, setUser, profilePic } = useContext(Context);
  const navigate = useNavigate();
  const description = useInputValue(user.profile.description || "");
  const [avatar, setAvatar] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(profilePic);

  useEffect(() => {
    setCurrentAvatar(profilePic);
  }, [profilePic]);

  const handleImageChange = (e) => {
    setAvatar(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCurrentAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description.value);
    if (avatar) {
      formData.append("avatar", avatar, avatar.name);
    }
    axios
      .post(`${PREDIKETE_API}/users/${user.id}/update-profile`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="UpdateProfileContainer">
      <form onSubmit={handleSubmit} className="UpdateProfileForm">
        <h2>Update Profile</h2>
        <figure className="CurrentAvatarContainer">
          <img className="CurrentAvatar" src={currentAvatar} alt="" />
        </figure>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={handleImageChange}
        />
        <label className="UploadButton" htmlFor="avatar">
          <FaUpload />
          <span>Choose a Photo</span>
        </label>
        <div className="FormItem">
          <label htmlFor="description">Description</label>
          <textarea type="text" id="description" {...description} />
        </div>
        <button>Update</button>
      </form>
    </div>
  );
};
