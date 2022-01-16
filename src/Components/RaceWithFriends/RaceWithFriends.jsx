import React from "react";
import buttonArrow from "../../images/button_arrow.png";
import "./RaceWithFriends.css";

function RaceWithFriends() {
  return (
    <div className="raceWithFriends">
      <h3>Race up to 200 friends in your own racetrack</h3>
      <button>
        Race Your Friends &nbsp; <img src={buttonArrow} alt="arrow" />
      </button>
    </div>
  );
}

export default RaceWithFriends;
