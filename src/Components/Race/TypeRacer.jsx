import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import carImg from "../../images/RedCar.png";
import BlueCarImg from "../../images/BlueCar.png";
import "./TypeRacer.css";

const URL = "https://typeracernodejs.herokuapp.com/";

const socket = io.connect(URL);
// web socket connection

const finishLine = 61.5; // represents view-width

function TypeRacer() {
  const [progress, setProgress] = useState(0); //Player 1 (client) progress

  const [player2, setPlayer2] = useState(0); // player 2 progress

  const [text, setText] = useState(""); //quote loaded from back-end

  const [typed, setTyped] = useState(""); // typed word

  const [start, setStart] = useState(0); // start position

  const [currWord, setCurrWord] = useState(""); // current word in text being typed

  const [background, setBackground] = useState("#fafafa"); //background for textbox - will change to red if word is mispelled

  const [color, setColor] = useState("#999999");

  const [title, setTitle] = useState("The race is on! Type the text below:"); //title of game

  const [timer, setTimer] = useState(0); //timer used for generating Words Per Minitue (WPM)

  const [connected, setConnected] = useState(false); //used to communicate with backend and tells when user is connected to a game room

  const [WPM, setWPM] = useState(0); // Player's "Words Per Minute"

  const [p2WPM, setP2WPM] = useState(0); // Player 2's "Words Per Minute"

  const [numWords, setNumWords] = useState(0); // total number of words in the generated sentence

  const [roomID, setRoomID] = useState(-1); // ID of socket(room) that the player is currently in

  const spaces = useRef(0); //# of spaces in text - used to determine the number of words in

  //players positions in race - used for dynamic styling of cars
  const progressStyle = {
    left: `${progress}vw`,
  };
  const progressStyle2 = {
    left: `${player2}vw`,
  };

  //styling of textBox
  const textBoxStyle = {
    fontWeight: "500",
    fontFamily: "Lato, sans-serif",
    border: "1px solid #c7d5dd",
    marginTop: "0.5em",
    textAlign: "justify",
    color: `${color}`,
    fontSize: "20px",
    width: "100%",
    backgroundColor: `${background}`, //dynamic styling of background (used to show errors in styling)
  };

  //timer - rerenders every second
  useEffect(() => {
    setTimeout(() => {
      setTimer((time) => time + 1);
    }, 1000);

    if (progress < finishLine) {
      setWPM((60 * numWords) / (timer + 1)); //update WPM every second
    }
    // eslint-disable-next-line
  }, [timer]);

  //find number of spaces and set first word as the current word
  useEffect(() => {
    spaces.current = 0;

    for (let i = 0; i < text.length; i++) {
      if (text.substring(i, i + 1) === " ") {
        spaces.current++;
      }
    }
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) === " ") {
        setCurrWord(text.substring(0, i));
        break;
      }
    }
  }, [text]);


  // function that sends current position of car to other player
  const sendPosition = (position) => {
    socket.emit("position", { roomID, position });
  };

  //run sendPosition everytime player progress futher towards finishline
  useEffect(() => {
    sendPosition(progress);
    // eslint-disable-next-line
  }, [progress]);

  //connect to a room at first render
  useEffect(() => {
    let roomId =""
    //join a server(room)
    socket.emit("join server", {
      user: `Guest: ${Math.floor(Math.random() * 5)}`,
    });

    //set roomID
    socket.on("roomID", (roomID) => {
      setRoomID(roomID);
      roomId = roomID
    });

    //setText to generated quote
    socket.on("paragraph", (quote) => {
      setText(quote.trim());
    });
    setText(text.replace('…', '...'))
    

    return () => { //Leave room when component dismounts (a.k.a leave page)
      socket.emit("leaveRoom", roomId);
      socket.off();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("gameReady", (playload) => {
      if (playload === 2) {
        setConnected(true);
      }
    });
    socket.emit("WPM", { WPM, roomID });
    socket.on("WPM", (WPM) => {
      setP2WPM(WPM);
    });
    // eslint-disable-next-line
  }, [WPM]);

  useEffect(() => {
    socket.on("position", (data) => {
      setPlayer2(data);
    });
  }, [player2]);


  const updateProgress = (input) => {
    //update game data when word typed correctly
    setTyped(""); //empty input textbox

    setNumWords((num) => num + 1); //increase # of words already typed

    let newProgress = progress + finishLine / (spaces.current + 1); //calculate new progress

    if (Math.round(newProgress, -1)>= finishLine) {
      //Finish Line Reached for user
      newProgress = finishLine;
      let results = "";
      if (player2 <finishLine){
        results = "WON!";
      }else{
        results = "Lost! ";
      }
      setTitle("Race Ended. You "+ results);
    }

    setProgress(newProgress); //update user progress

    setStart((prevStart) => prevStart + input.length); //update completed part of quote
  };

  const handleTyped = (e) => {
    const input = e.target.value; //user input
    const currChar = input.charAt(input.length - 1); //last typed character
    setTyped(input); //update textbox to input

    if (currChar === " ") {
      // space separator (most words)

      if (currWord === input.substring(0, input.length - 1)) {
        //word typed correctly

        updateProgress(input);

        for (let i = start + input.length; i <= text.length; i++) {
          //set next word
          if (text.charAt(i) === " " || i === text.length) {
            setCurrWord(text.substring(start + input.length, i));
            break;
          }
        }
      }
    } else if ((currChar === "." || currChar === "!" || currChar === "?") && (spaces.current === numWords)) {
      //end of quote separators

      if (input === currWord ) {
        updateProgress(input);
        setCurrWord(""); //end -- no need to set a "current word"
      }
    } else {
      //not a separator

      if (currWord.includes(input) || input.trim() === " ") {
        setBackground("#fafafa");
        setColor("#999999");
      } else {
        setBackground("red");
        setColor("black");
      }
    }

  
  };

  return !connected ? (
    // loading state -- other user has not connected yet
    <h1> Waiting for another player...</h1>
  ) : (
    // race state
    <div className="race">
      {/* table with rows for each player */}
      <div className="race__table">
        <h1 className="header">{title}</h1>

        {/* First Row - user */}
        <div className="rowAndWPM">
          <div className="row">
            <div className="user" style={{ position: "relative" }}>
              <h3
                style={{
                  left: `${progress - 2.5}vw`,
                }}
              >
                You
              </h3>

              <img
                className="car"
                src={carImg}
                alt="car"
                style={progressStyle}
              />
            </div>

            <div className="border"></div>
          </div>
          <h3 className="WPM">{Math.floor(WPM)} WPM</h3>
        </div>
        {/* Second Row - opponent */}
        <div className="rowAndWPM">
          <div className="row">
            <div className="opponent user" style={{ position: "relative" }}>
              <h3
                style={{
                  left: `${player2 - 3.2}vw`,
                }}
              >
                Guest
              </h3>

              <img
                className="car2"
                src={BlueCarImg}
                alt="car"
                style={progressStyle2}
              />
            </div>

            <div className="border"></div>
          </div>
          <h3 className="WPM">{Math.floor(p2WPM)} WPM</h3>
        </div>
      </div>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        {/* Writing (Quote) -- Keeps already typed words green and the current word underlined*/}
        <div className="textToType">
          <span className="greenText">{text.substring(0, start)}</span>
          <span style={{ textDecoration: "underline" }}>{currWord}</span>
          {text.substring(start + currWord.length, text.length)}
        </div>

        {/* textBox with handleTyped function */}
        <input
          style={textBoxStyle}
          className="textBox"
          type="text"
          name="typeText"
          value={typed}
          onChange={handleTyped}
          placeholder="Type the above text here when the race begins"
          autoComplete="off"
        ></input>
      </form>
    </div>
  );
}

export default TypeRacer;
