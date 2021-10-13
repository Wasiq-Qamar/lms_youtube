import "./App.css";
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//  Material UI
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeObject from "./util/theme";

//  Context
import { Provider as ClassProvider } from "./context/ClassContext";
import { Provider as AuthProvider } from "./context/AuthContext";

//  Components
import Navbar from "./components/Navbar";

//  Pages
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Class from "./pages/class";
import Student from "./pages/student";
import Teacher from "./pages/teacher";

const theme = createMuiTheme(themeObject);

function App() {
  let token = localStorage.getItem("token");
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/class">
                <Class />
              </Route>
              <Route exact path="/student">
                <Student />
              </Route>
              <Route exact path="/teacher">
                <Teacher />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default () => {
  return (
    <ClassProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ClassProvider>
  );
};
