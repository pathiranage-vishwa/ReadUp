import React, { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { GlobalState } from "../../../GlobalState.js";
//import styled from "styled-components";
import "./Style/checkout.css";

export default function Checkout() {
  const [email, setMail] = useState("");
  const [pNumber, setPNumber] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [pCode, setPCode] = useState("");
  const [transfer_amount, setTransfer_amount] = useState("");
  const history = useHistory();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("Cart")));
    setTransfer_amount(localStorage.getItem("Total"));
  }, []);

  const checkout = async (e) => {
    localStorage.setItem("Email", email);
    localStorage.setItem("PNumber", pNumber);
    localStorage.setItem("Name", name);
    localStorage.setItem("Address", address);
    localStorage.setItem("Country", country);
    localStorage.setItem("PCode", pCode);
    history.push("/addPayment");
  };

  console.log(cart);

  return (
    <div className="categoryTop">
      <div className="container-fluid ps-md-0 ">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 checkoutImage"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="card-body p-md-5 text-black">
                <form onSubmit={checkout}>
                  <h3 className="category-heading mb-6">Checkout</h3>
                  <hr className="hr1" />
                  <br />
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" for="form3Example1m">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        className="form-control form-control-lg"
                        onChange={(e) => setMail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" for="form3Example1m">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="pNumber"
                        value={pNumber}
                        className="form-control form-control-lg"
                        onChange={(e) => setPNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" for="form3Example1m">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        className="form-control form-control-lg"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" for="form3Example1m">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={address}
                        className="form-control form-control-lg"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" for="form3Example1m">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={country}
                        className="form-control form-control-lg"
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" for="form3Example1m">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="pCode"
                        value={pCode}
                        className="form-control form-control-lg"
                        onChange={(e) => setPCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div class="amount">
                    <div class="inner">
                      <span class="dollar">
                        <b>
                          <h2>Total LKR.{transfer_amount}</h2>
                        </b>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end pt-3">
                    <button
                      className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                      type="submit"
                      style={{ height: "50px" }}
                    >
                      Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
