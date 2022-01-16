import React from "react";
import "./Navbar.css";
import image from "../../images/typeracer-logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const disconnectSocket = () => {
    // console.log('ran')
    // socket.emit("disconnected");
    // socket.off();
  };

  return (
    <div className="navbarContainer">
      <div className="navbar__left">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="navbar__left__logo" onClick={disconnectSocket}>
            <img className="logo" src={image} alt="logo" />
            typeracer
          </div>
        </Link>
      </div>

      <div className="navbar__center">
        <Link to={"/play"} style={{ textDecoration: "none", color: "white" }}>
          <h1 className="navbar__center_link">Race</h1>
        </Link>
        <h1 className="navbar__center_link">Pit Stop</h1>
        <h1 className="navbar__center_link">Discord</h1>
        <h1 className="navbar__center_link">About</h1>
      </div>

      <div className="navbar__right">
        <div className="navbar__right__container">
          <div className="navbar__right__item signIn">
            <div className="topTitle">Guest</div>
            <div className="bottomTitle">Sign In</div>
          </div>
          <div className="navbar__right__item Skill Level">
            <div className="topTitle">Skill Level</div>
            <div className="bottomTitle">Average</div>
          </div>
          <div className="navbar__right__item Avg. Speed">
            <div className="topTitle">Avg. Speed</div>
            <div className="bottomTitle"> 0 WPM</div>
          </div>
          <div className="navbar__right__item Races">
            <div className="topTitle">Races</div>
            <div className="bottomTitle">0</div>
          </div>
          <div className="navbar__right__item Points">
            <div className="topTitle">Points</div>
            <div className="bottomTitle">0</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
