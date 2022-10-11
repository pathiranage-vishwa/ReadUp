import React, {useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './Styles/profile.css';
import { GlobalState } from "../../../GlobalState";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

//Update User

function UpdateUser() {
    const history = useHistory();
    const state = useContext(GlobalState);
    const [id,setId] = useState();
    const [firstName, setfirstName] = useState();
    const [lastName,setlastName] = useState();
    const [username,setUsername]= useState();
    const [email,setEmail]= useState();
    const [userType,setUserType]= useState();
    const [newpassword,setNewpassword]= useState();
    const [confNewPassword,setConfNewPassword]= useState();
    const [user] = state.userAPI.user;
    const [token] = state.token;
    const [image, setImage] = useState();

    useEffect(() => {

        setId(localStorage.getItem('uid'));
        setfirstName(localStorage.getItem('FirstName'));
        setlastName(localStorage.getItem('LastName'));
        setUsername(localStorage.getItem('UserName'));
        setEmail(localStorage.getItem('Email'));
        setUserType(localStorage.getItem('UserType'));
        setImage(localStorage.getItem('Image'))

    },[] );

    function submitData(e) {
        e.preventDefault();
        const newRoute = {
          firstName,
          lastName,
          username,
          email,
          userType,
          image
        }
        swal({
            title: "Are you sure?",
            text: "You are going to update a users account!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              axios.put(`/user/updateUsr/${id}`,newRoute)
              swal("Poof! User account successfully updated!", {
                icon: "success",
              });
              history.push("/allusers");
              window.location.reload(false);
            } else {
              swal("User account is safe!");
            }
          }).catch((err)=>{
    
            alert(err);
         })
      
    }

    const changeAvatar = async (e) => {
      e.preventDefault();
      try {
        const file = e.target.files[0];
  
        if (!file) return swal("ERROR!", "No files were uploaded!", "error");
  
        if (file.size > 1024 * 1024)
          return swal("ERROR!", "Size too large.", "error");
  
        if (file.type !== "image/jpeg" && file.type !== "image/png")
          return swal("ERROR!", "File format is incorrect.", "error");
  
        let formData = new FormData();
        formData.append("file", file);
  
        const res = await axios.post(
          "/api/upload",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: token,
            },
          }
        );
        swal("Done!", "Image upload successfull!", "success");
        setImage(res.data.url);
      } catch (err) {
        return swal("ERROR!", err.response.res.msg, "error");
      }
    };

    function resetPassword(e) {
      e.preventDefault();
      const newPassword = {
        newpassword,
        confNewPassword,
      }
      swal({
          title: "Are you sure?",
          text: "You are reset your account password!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            axios.put(`/user/updateUsr/${id}`,newPassword)
            swal("Poof! User password updated successfully!", {
              icon: "success",
            });
          } else {
            swal("Password is safe!");
          }
        }).catch((err)=>{
  
          alert(err);
       })
    
  }

    return (
        <>
        <div className="profContainer">
        <div className="profLeft">
          <div className="profTop">
            UPDATE <br />
            USER <br />
            PROFILE
          </div>
        </div>
        <div className="profile_page">
            <div className="col-left">
            <form onSubmit={submitData}  className="form">
                <div className='card1'>
                <h2>Update</h2>
                <div className="avatar">
                    <img src={image} alt="" />
                      <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input
                          type="file"
                          name="file"
                          id="file_up"
                          onChange={changeAvatar}
                        />
                      </span>
                    </div>
                <br/>
                <div className="row">
                <div className="col-md-6 mb-4">
                <div className="form-outline">
                <div className="form-group">
                    <label htmlFor="name">First Name</label>
                    <input type="text" name="firstName" id="firstName" defaultValue={firstName}
                    placeholder="First name" onChange={e=>{setfirstName(e.target.value);}} />
                </div>
                </div>
                </div>
                <div className="col-md-6 mb-4">
                <div className="form-outline">
                <div className="form-group">
                    <label htmlFor="regNumber">Last Name</label>
                    <input type="text" name="lastName" id="lastName" defaultValue={lastName}
                    placeholder="Last Name" onChange={e=>{setlastName(e.target.value);}}/>
                </div>
                </div>
                </div>
                </div>

                <div className="row">
                <div className="col-md-6 mb-4">
                <div className="form-outline">
                <div className="form-group">
                    <label htmlFor="email">Username</label>
                    <input type="username" name="username" id="username" defaultValue={username}
                    placeholder="Username" onChange={e=>{setUsername(e.target.value);}}/>
                </div>
                </div>
                </div>

                <div className="col-md-6 mb-4">
                <div className="form-outline">
                <div className="form-group">
                    <label htmlFor="regNumber">Email</label>
                    <input type="email" name="email" id="email" defaultValue={email}
                    placeholder="Email" onChange={e=>{setEmail(e.target.value);}}/>
                </div>
                </div>
                </div>
                </div>

                <div className="col-md-6 mb-4">
                <div className="form-outline">
                <div className="form-group">
                <label htmlFor="email">User type</label>
                <select
                          name="userType"
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => {
                            setUserType(e.target.value);
                          }}
                        >
                          <option value="Buyer">Buyer</option>
                          <option value="Seller">Seller</option>
                        </select>
                </div>
                </div>
                </div>

                <button className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                >Update</button>
                </div>
                </form>
            </div>
            <div className="col-right">
            <form className="form" onSubmit={resetPassword}>
                <div className='card2'>
                <h2>Reset Password</h2>
                <br/>
                <div className="row">
                <div className="col-md-6 mb-4">
                <div className="form-outline">
                <div className="form-group">
                    <label htmlFor="name">New Password</label>
                    <input type="text" name="newpassword" id="newpassword"
                    placeholder="new password" onChange={e=>{setNewpassword(e.target.value);}} />
                </div>
                </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-6 mb-4">
                <div className="form-outline">
                <div className="form-group">
                    <label htmlFor="regNumber">Confirm Password</label>
                    <input type="text" name="confNewPassword" id="confNewPassword"
                    placeholder="confirm New Password" onChange={e=>{setConfNewPassword(e.target.value);}}/>
                </div>
                </div>
                </div>
                </div>
                <button className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                >Update Password</button>
                </div>
                </form>
            </div>
        </div>
        </div>
        <br/><br/><br/><br/><br/><br/><br/>
        </>
    )
}

export default UpdateUser