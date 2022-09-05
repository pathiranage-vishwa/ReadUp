import React, { useState } from "react";
import axios from "axios";
import "./Styles/forgotPassword.css";

const initialState = {
  email: "",
  err: "",
  success: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async () => {
    try {
      const res = await axios.post("http://localhost:8070/user/forgot", {
        email,
      });

      alert("successfully sent!", "Please check your emails!", "success");
    } catch (err) {
      alert("ERROR!", err.response.data.msg, "error");
    }
  };

  return (
    <div className="fg_pass">
      <h2>Forgot Your Password?</h2>

      <div className="row">
        <label htmlFor="email">Enter your email address</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChangeInput}
        />
        <button onClick={forgotPassword}>Verify your email</button>
      </div>
    </div>
  );
}

export default ForgotPassword;
