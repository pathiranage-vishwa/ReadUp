import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Styles/forgotPassword.css";

const initialState = {
  password: "",
  cf_password: "",
};

function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  console.log(useParams());
  const { password, cf_password } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPass = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8070/user/reset",
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
    <div className="fg_pass">
      <h2>Reset Your Password</h2>

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
  );
}

export default ResetPassword;
