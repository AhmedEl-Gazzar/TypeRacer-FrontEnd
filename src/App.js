import "./App.css";
import Home from "./Pages/home/Home";
import RaceGame from "./Pages/Play/Play";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";


function App() {
  return (
    <Router>
      <Navbar/>
      <div className="app">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/play" exact component={RaceGame} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
