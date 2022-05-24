import React from "react";

const Logout = (props) => {
  return (
    <div>
      <button
        className="btn btn-danger"
        type="submit"
        onClick={props.handleLogOut}
      >
        Log out
      </button>
    </div>
  );
};

export default Logout;
