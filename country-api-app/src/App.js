import "./App.css";
//importing Router related elements
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./comp/HomePage";
import CountryInfo from "./comp/CountryInfo";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          
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
