import "./App.css";
//importing Router related elements
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./comp/HomePage";
import CountryInfo from "./comp/CountryInfo";

function App() {
  return (
    <>
      <Router>
        <div className="">
          <nav className="stick menu">
            <input type="checkbox" className="menu"/>
            <label></label>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">3D Map</a>
              </li>
            </ul>
          </nav>
          <header className="App-header">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route
                path="/countries/:countryName"
                component={CountryInfo}
              />
            </Switch>
          </header>
        </div>
      </Router>
    </>
  );
}

export default App;
