import React from "react";
import Race from "../../Components/Race/TypeRacer";
import Settings from "../../Components/Settings/Settings";
import "./Play.css"
function Play() {
  return (
    <div className="Container">
        <Race />
        
        <Settings/>
    </div>
  );
}

export default Play;
