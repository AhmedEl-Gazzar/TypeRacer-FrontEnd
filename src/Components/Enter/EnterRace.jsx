import React from "react";
import { Link } from "react-router-dom";
import buttonArrow from "../../images/button_arrow.png";
import "./EnterRace.css";

function EnterRace() {
  return (
    <div className="game">
      <h1 className="game__title">typeracer – the Global Typing Competition</h1>
      <p className="game__subheading">
        Increase your typing speed while racing against others
      </p>
      <div className="game__enterRace">
        <h3>Get matched up with online opponents</h3>
        <Link style={{ textDecoration: "none", color: "white" }} to={"/play"}>
          <button className="button">
            Enter a Typing Race{" "}
            <img className="arrow" src={buttonArrow} alt="" />{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EnterRace;
