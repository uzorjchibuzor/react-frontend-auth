import React, { Component } from "react";
import axios from "axios";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
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
        password_confirmation: this.state.password_confirmation,
      },
    };
    axios
      .post("http://localhost:3001/registrations", body, {
        withCredentials: true,
      })
      .then((response) => {
        if (response) {
          this.props.handleLogin(response.data);
        }
      })
      .catch((error) => console.log("error signing up", error));
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address: </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password_confirmation">Confirm Password:</label>
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm your password"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Sign up
        </button>
      </form>
    );
  }
}
