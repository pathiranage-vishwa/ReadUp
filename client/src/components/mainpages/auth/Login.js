import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/login.css";
import axios from "axios";
import swal from "sweetalert";

//Login

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //API call to validate login user credentials
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
      swal("Logged In!", "You successfully logged in!", "success");
      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      swal("ERROR!", err.response.data.msg, "error");
    }
  };

  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <div className="d-none d-md-flex col-md-4 col-lg-6 logimage"></div>
        <div className="col-md-8 col-lg-5">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="log-heading mb-4">Welcome back!</h3>

                  <form onSubmit={loginSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        required
                        onChange={onChangeInput}
                        placeholder="email"
                      ></input>
                      <label for="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={user.password}
                        required
                        onChange={onChangeInput}
                        placeholder="Password"
                      ></input>
                      <label for="floatingPassword">Password</label>
                    </div>

                    <div>
                      <a
                        className="small"
                        style={{ color: "black" }}
                        href={"/forget_pw"}
                      >
                        Forgot password?
                      </a>
                    </div>
                    <br />
                    <div className="d-grid">
                      <button
                        className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-2"
                        style={{ height: "50px" }}
                      >
                        Sign in
                      </button>
                      <a
                        className="btn btn-lg btn-success btn-signup text-uppercase fw-bold mb-2"
                        href={"/register"}
                        style={{ height: "50px" }}
                      >
                        Sign Up
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
