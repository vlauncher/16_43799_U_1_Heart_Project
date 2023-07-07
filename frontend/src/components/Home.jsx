import React from "react";
import { Link } from "react-router-dom";

import "../StyleSheet/home.scss";
import Pix from "../Assets/heart.jpg";

const Home = () => {
  window.addEventListener("load", () => {
    document.querySelector("body").classList.add("loaded");
  });
  return (
    <div className="home">
      <div className="side-home">
        <div className="paragraph">
          {/* <img src={Logo} alt="company" /> */}
          <h1>Heart Disease Predictor</h1>
          <h2>Want To Know Your Health Status with the  help a predictor. Level Up!</h2>
          <p>
            Top lecturers from different universities, teaching millions of
            students on uLectures. Top lecturers from different universities, teaching millions of
            students on uLectures.
            Top lecturers from different universities, teaching millions of
            students on uLectures.
          </p>
          <div className="other-text">
            <p>
              Top lecturers from different universities, teaching millions of
              students on uLectures.
              Top lecturers from different universities, teaching millions of
              students on uLectures.
            </p>
            <p>
              Top lecturers from different universities, teaching millions of
              students on uLectures.
              Top lecturers from different universities, teaching millions of
              students on uLectures.
            </p>
          </div>
        </div>
        <div className="butn">
          <Link to="/sign-in">
            <button type="btn">Check Heart Status</button>
          </Link>
        </div>
      </div>
      <div className="side-pic">
        <img src={Pix} alt="full-pix" />
        {/* <img
        className="background"
        src={Background}
        alt="full-pix"
      /> */}
      </div>
    </div>
  )
}

export default Home


