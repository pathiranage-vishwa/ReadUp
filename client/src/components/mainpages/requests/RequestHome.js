import React from "react";
import "./Styles/requests.css";
import reqBook from "./Styles/reqBook.png";
import reqBoViewReqs from "./Styles/ViewReqs.png";

export default function RequestHome() {
  return (
    <div className="container">
      <br />
      <div className="card">
        <div className="card-body">
          <h1>
            <center>Requests</center>
          </h1>
          <br />
          <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h3>
                    <center>Request Books</center>
                  </h3>
                  <hr />
                  <img
                    className="card-img-top"
                    src={reqBook}
                    alt="Card image cap"
                  />
                  <br /> <br />
                  <center>
                    <a
                      className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                      href="/request"
                      role="button"
                    >
                      Go
                    </a>
                  </center>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h3>
                    <center>View Book Requests</center>
                  </h3>
                  <hr />
                  <img
                    className="card-img-top"
                    src={reqBoViewReqs}
                    alt="Card image cap"
                  />
                  <center>
                    <a
                      className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                      href="/allrequest"
                      role="button"
                    >
                      Go
                    </a>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
