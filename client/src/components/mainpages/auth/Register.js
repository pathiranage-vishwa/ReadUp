import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/register.css";
import Select from "react-select";
import axios from "axios";
import swal from "sweetalert";

function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    userType: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      swal("Done!", "Successfully Registered!", "success");
      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="regTop">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container-fluid ps-md-0 ">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 regimage"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="card-body p-md-5 text-black">
                <form onSubmit={registerSubmit}>
                  <h3 className="register-heading mb-6">Let's Get Started</h3>
                  <hr className="hr1" />
                  <br />

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" for="form3Example1m">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={user.firstName}
                          className="form-control form-control-lg"
                          onChange={onChangeInput}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" for="form3Example1n">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={user.lastName}
                          className="form-control form-control-lg"
                          onChange={onChangeInput}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" for="form3Example1m1">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          placeholder="Username"
                          autocomplete="off"
                          value={user.username}
                          className="form-control form-control-lg"
                          onChange={onChangeInput}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" for="form3Example1m1">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          autocomplete="off"
                          value={user.password}
                          className="form-control form-control-lg"
                          onChange={onChangeInput}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" for="form3Example1m">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="Email Address"
                          name="email"
                          value={user.email}
                          onChange={onChangeInput}
                          className="form-control form-control-lg"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div>
                        <label className="form-label" for="form3Example1m1">
                          User Type
                        </label>
                        <select
                          name="userType"
                          class="form-select"
                          value={user.userType}
                          aria-label="Default select example"
                          onChange={onChangeInput}
                        >
                          <option selected>Select User Type</option>
                          <option value="Buyer">Buyer</option>
                          <option value="Seller">Seller</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end pt-3">
                    <button
                      className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                      type="submit"
                      style={{ height: "50px" }}
                    >
                      Sign Up
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

export default Register;
