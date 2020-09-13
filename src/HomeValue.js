import React from "react";
import "./HomeValue.css";
import logo from "./assets/nock-nock-logo-wht.png";
import { Link } from "react-router-dom";
import PriceRange from "./PriceRange";

function HomeType() {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="d-flex justify-content-start pl-5 pt-3">
          <img src={logo} className="img-fluid" alt="alt-text" />
        </div>
      </div>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <div className="appMiddle">
            <div className="appMiddle_header">
              What is your estimated <span>Home</span>
            </div>
            <div className="appMiddle_content">
              <div className="container">
                <div className="row text-center mt-5">
                  <div className="col-12">
                    <div className="money"> $75000</div>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-12"></div>
                </div>
                <div className="row text-center">
                  <div className="col-12">
                    <div className="appMiddle_contentElement_btn">
                      <Link className="btn btn-outline-primary" to="/value">
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="appMiddle_footer mt-2 mb-1 d-flex justify-content-center align-items-center">
              <Link style={{ color: "black", fontWeight: "600" }} to="/">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomeType;
