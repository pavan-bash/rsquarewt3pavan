import React from "react";
import "./HomeType.css";
import pic11 from "./assets/Group 174.png";
import pic12 from "./assets/Group 175.png";
import pic13 from "./assets/Group 176.png";
import pic14 from "./assets/Group 177.png";
import logo from "./assets/nock-nock-logo-wht.png";
import { Link } from "react-router-dom";

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
              What <span>Type of Home</span> are you looking to sell.
            </div>
            <div className="appMiddle_content">
              <div className="row text-center">
                <div className="col-sm-6 col-xs-12 d-flex align-items-end justify-content-center">
                  <div className="appMiddle_contentElement">
                    <div className="row">
                      <div className="col-12 d-flex align-items-end justify-content-center">
                        <img
                          alt="alt-text"
                          src={pic11}
                          className="appMiddle_contentElement_img"
                        />
                      </div>
                    </div>
                    <div className="row mt-auto">
                      <div className="col-12">
                        <div className="appMiddle_contentElement_btn">
                          <Link className="btn btn-outline-primary" to="/value">
                            Single Family
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-12 d-flex align-items-end justify-content-center">
                  <div className="appMiddle_contentElement">
                    <div className="row">
                      <div className="col-12 d-flex align-items-end justify-content-center">
                        <img
                          alt="alt-text"
                          src={pic12}
                          className="appMiddle_contentElement_img"
                        />
                      </div>
                    </div>
                    <div className="row mt-auto">
                      <div className="col-12">
                        <div className="appMiddle_contentElement_btn">
                          <Link className="btn btn-outline-primary" to="/value">
                            Multi Family
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-12 d-flex align-items-end justify-content-center">
                  <div className="appMiddle_contentElement">
                    <div className="row">
                      <div className="col-12 d-flex align-items-end justify-content-center">
                        <img
                          alt="alt-text"
                          src={pic13}
                          className="appMiddle_contentElement_img"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="appMiddle_contentElement_btn">
                          <Link className="btn btn-outline-primary" to="/value">
                            Townhouse
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-12 d-flex align-items-end justify-content-center">
                  <div className="appMiddle_contentElement">
                    <div className="row">
                      <div className="col-12 d-flex align-items-end justify-content-center">
                        <img
                          alt="alt-text"
                          src={pic14}
                          className="appMiddle_contentElement_img"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="appMiddle_contentElement_btn">
                          <Link className="btn btn-outline-primary" to="/value">
                            Condominium
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="appMiddle_footer mb-1 d-flex justify-content-center align-items-center">
              <a href="#" style={{ color: "black", fontWeight: "600" }}>
                Other
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomeType;
