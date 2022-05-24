import React, { Component } from "react";
import axios from "axios";

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const body = {
      user: {
        email: this.state.email,
        password: this.state.password,
      },
    };
    axios
      .post("http://localhost:3001/sessions", body, {
        withCredentials: true,
      })
      .then((response) => {
        if (response) {
         this.props.handleLogin(response.data)
        }
      });
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email address"
          value={this.state.email}
          onChange={this.handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <button type="submit">Log in</button>
      </form>
    );
  }
}
