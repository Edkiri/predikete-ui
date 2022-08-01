import React, { useContext, useState } from "react";

import { Context } from "@context/AppContext";

import { useInputValue } from "@hooks/useInputValue";

import { FaUpload } from "react-icons/fa";

import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PREDIKETE_API } from "../../constants";

export const DEFAULT_IMG =
  "https://th.bing.com/th/id/OIP.Z61YNU0T-ZJyriJB5FBdNAHaHa?pid=ImgDet&w=200&h=200&rs=1";

export const NewGroup = () => {
  const { jwt } = useContext(Context);
  const navigate = useNavigate();
  const [picture, setPicture] = useState(null);
  const [displayedPicture, setDisplayedPicture] = useState(DEFAULT_IMG);
  const name = useInputValue("");
  const about = useInputValue("");

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDisplayedPicture(reader.result);
        setPicture(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("about", about.value);
    if (picture) {
      formData.append("picture", picture, picture.name);
    }
    axios
      .post(`${PREDIKETE_API}/groups`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        navigate(`/group/${res.data.id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="NewGroupContainer">
      <form className="NewGroupForm" onSubmit={handleSubmit}>
        <h2>New group</h2>
        <div className="NewGroupItem">
          <label>Name</label>
          <input type="text" placeholder="Pick a name" {...name} />
        </div>
        <div className="NewGroupItem">
          <label>About</label>
          <input
            type="text"
            placeholder="What is this group about?"
            {...about}
          />
        </div>
        <div className="NewGroupItem">
          <input id="picture" type="file" onChange={handleImageChange} />
          <figure className="PictureContainer">
            <img src={displayedPicture} alt="" />
          </figure>
          <label className="UploadButton" htmlFor="picture">
            <FaUpload />
            <span>Choose a Photo</span>
          </label>
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};
