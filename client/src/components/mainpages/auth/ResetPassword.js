import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Styles/forgotPassword.css";

const initialState = {
  password: "",
  cf_password: "",
};

//Reset password

function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  console.log(useParams());
  const { password, cf_password } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  //Validate the request and API call for reset password
  const handleResetPass = async () => {
    try {
      await axios.post(
        "http://localhost:5000/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      alert("successfully updated!", "Password reset completed !", "success");
    } catch (err) {
      alert("ERROR!", err.response.data.msg, "error");
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
          <div className="d-none d-md-flex col-md-4 col-lg-6 reset_passimage"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="card-body p-md-5 text-black">
                <div className="fg_pass">
                  <h2>Reset Password</h2>

                  <div className="row">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={handleChangeInput}
                    />

                    <label htmlFor="cf_password">Confirm Password</label>
                    <input
                      type="password"
                      name="cf_password"
                      id="cf_password"
                      value={cf_password}
                      onChange={handleChangeInput}
                    />

                    <button onClick={handleResetPass}>Reset Password</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
