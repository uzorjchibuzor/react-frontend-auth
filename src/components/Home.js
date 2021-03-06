import React, { Component } from "react";

export default class Home extends Component {
  render() {
    const salutation = (userEmail) => {
      if (userEmail) {
        return `Hello ${userEmail}`;
      } else {
        return "Welcome";
      }
    };
    return (
      <div>
        <h2>{salutation(this.props.user)}</h2>
      </div>
    );
  }
}
