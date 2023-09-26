import React from "react";
import "./RedesignHouse.css";
import RedesignComponent from "./RedesignHouseai.jsx";
import EndImage from "../endlogo/endimage";
import Footer from "../footer/footer";

const RedesignHouse = () => {
  return (
    <div>
      <div className="container mt-5">
        <div className="redesign-house">
          <div className="row">
            <div className="col-xl-5 col-lg-5 m-auto  col-md-12 col-sm-12 col-xs-12">
              <h2 className="redesign-house-heading">
                Transform your house in seconds
              </h2>
              <p className="redesign-house-description">
                Begin by uploading a photo, choosing the room type, selecting
                themes, and clicking Render designs.
              </p>
            </div>
            <div className="col-xl-5 col-lg-5 m-auto  col-md-12 col-sm-12 col-xs-12">
              <div className="redesign-house-images">
                <div className="image-container1">
                  <img
                    className="img123"
                    src={process.env.PUBLIC_URL + "/Mediamodifier.png"}
                    alt="Image 1"
                  />
                  <img
                    className="overlay-image"
                    width="60px"
                    height="60px"
                    src={process.env.PUBLIC_URL + "/crop.png"}
                    alt="Image 2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="circle1 right-top1"></div>
          <div className="circle112 right-top1"></div>
        </div>
        <RedesignComponent />
      </div>
      <EndImage />
      <Footer />
    </div>
  );
};

export default RedesignHouse;
