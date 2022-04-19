import React from "react";
import "./welcome.css"
export const WelcomeScreen = () => {
  return (
    <div className="ws-wrapper">
      <div className="image"></div>
      <div className="ws-text">
          <h1 className="heading">Search for a movie...</h1>
          <p className="sub-heading">I got the corn</p>
      </div>
    </div>
  );
};
