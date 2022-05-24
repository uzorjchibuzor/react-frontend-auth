import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Header from "./Header";
import Signin from "./Signin";
import Signup from "./Signup";
import Logout from "./Logout";
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
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogOut(data) {
    if (data.logged_out) {
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {},
      });
    }
  }



  handleLogoutClick() {
    axios
      .delete("https://auth-app-api-rails-react.herokuapp.com/logout", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_out) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
          })
          this.props.navigate("/");
        }
      })
      .catch((error) => console.log("log out errors", error.message));
    this.props.navigate("/");
  }

  checkLoginStatus() {
    axios
      .get("https://auth-app-api-rails-react.herokuapp.com/logged_in", { withCredentials: true })
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
        <Header inOrOut={this.state.loggedInStatus} />
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

            <Route
              path="/signout"
              element={<Logout handleLogOut={this.handleLogoutClick} />}
            />
          </Routes>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
