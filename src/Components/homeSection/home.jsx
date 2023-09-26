import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-7 m-auto col-lg-8  col-md-12 col-sm-12 col-xs-12">
          <div className="background-gradient mt-5">
            <p className="main-text">
              <span className="main-text1">ALREADY</span> GENERATED MORE THAN 1
              MILLION DESIGNS
            </p>
          </div>
          <h2 className="sub-heading" style={{ textAlign: "center" }}>
            Transform Houses
            <br />
            in Seconds using ai
          </h2>
          <p className="sub-text">
            Capture a house Photo and see it Transform into 8+ themes instantly.
            Join Our Satisfied customers <br /> and revamp your space today!
          </p>
          <div className="button-container">
            <Link to="/desiging" className="log-button">
              TRANSFORM YOUR HOUSE
            </Link>
          </div>
        </div>
        <div className="top-right-section">
          <div className="round-background"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
