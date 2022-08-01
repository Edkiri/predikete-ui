import React from "react";

import logo from "@assets/logo.png";
import hero from "@assets/hero.jpg";

import "./styles.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/my-groups");
  };

  return (
    <>
      <div className="HeroContainer">
        <img className="LogoImage" src={logo} alt="" />
        <h1>
          Make your <strong>pools</strong> and compite!
        </h1>
        <img className="HeroImage" src={hero} alt="" />
      </div>
      <h4 className="ForFree">
        For free<span>!</span>
      </h4>
      <p className="HeroSubtitle">
        Create or join a group and start your predictions
      </p>
      <button onClick={handleClick} className="StartButton">
        Get Start!
      </button>
    </>
  );
};
