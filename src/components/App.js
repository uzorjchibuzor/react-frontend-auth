import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Header from "./Header";
import Signin from "./Signin";
import Signup from "./Signup";
import { withRouter } from "../withRouter";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((response) => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user,
          });
        } else {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
          });
        }
      })
      .catch((error) => console.log("check login error", error));
  }
  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    if (data.logged_in) {
      this.setState({
        loggedInStatus: "LOGGED_IN",
        user: data.user,
      });
      this.props.navigate("/");
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="app container mt-3">
          <Routes>
            <Route path="/" element={<Home user={this.state.user.email} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/signin"
              element={<Signin handleLogin={this.handleLogin} />}
            />
            <Route
              path="/signup"
              element={<Signup handleLogin={this.handleLogin} />}
            />
          </Routes>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
