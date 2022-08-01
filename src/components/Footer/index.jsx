import React from "react";

import { FaHeart } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

import "./styles.css";

export const Footer = () => {
  return (
    <div className="Footer">
      <p>
        Made with <FaHeart className="HeartIcon" /> by <a href="https://www.linkedin.com/in/edkiriakos/">Eduardo Kiriakos</a>
      </p>
      <div className="SocialMedia">
        <a href="https://github.com/Edkiri" className="SocialMediaIconContainer">
          <FaGithubSquare className="SocialMediaIcon"/>
        </a>
        <a href="https://www.linkedin.com/in/edkiriakos/" className="SocialMediaIconContainer">
          <FaLinkedin className="SocialMediaIcon"/>
        </a>
        <a href="https://twitter.com/ea_kiriakos" className="SocialMediaIconContainer">
          <FaTwitterSquare className="SocialMediaIcon"/>
        </a>
        <a href="https://www.instagram.com/eduardokiriakos/" className="SocialMediaIconContainer">
          <FaInstagramSquare className="SocialMediaIcon"/>
        </a>
      </div>
    </div>
  );
};
