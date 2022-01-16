import React from "react";
import "./Practice.css";
import buttonArrow from "../../images/button_arrow.png";

function Practice() {
  return (
    <div className="practice">
      <h3>Improve your typing skills on your own</h3>
      <button>
        Practice Yourself &nbsp; <img src={buttonArrow} alt="arrow" />
      </button>
    </div>
  );
}

export default Practice;
