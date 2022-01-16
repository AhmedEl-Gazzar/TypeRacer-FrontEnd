import React from "react";
import EnterRace from "../../Components/Enter/EnterRace";
import Settings from "../../Components/Settings/Settings";
import Practice from "../../Components/Practice/Practice";
import RaceWithFriends from "../../Components/RaceWithFriends/RaceWithFriends";
import "./Home.css";

function Home() {
  return (
    <div className="home__container">
      <div className="gameAndSettings">
        <EnterRace />
        <Settings />
      </div>
      <div className="pracAndFriends">
        <Practice />
        <RaceWithFriends />
      </div>
    </div>
  );
}

export default Home;
