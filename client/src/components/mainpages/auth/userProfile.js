import React, {useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { GlobalState } from "../../../GlobalState";
import './Styles/updateUser.css';
import swal from "sweetalert";

function Profile() {
    const state = useContext(GlobalState);
    const [id,setId] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname,setLastname] = useState();
    const [username,setUsername]= useState();
    const [email,setEmail]= useState();
    const [userType,setUserType]= useState();
    const [user] = state.userAPI.user;
    const [token] = state.token;
    const [image, setImage] = useState(false);

    useEffect(() => {

        setId(localStorage.getItem('uid'));
        setFirstname(localStorage.getItem('FirstName'));
        setLastname(localStorage.getItem('LastName'));
        setUsername(localStorage.getItem('UserName'));
        setEmail(localStorage.getItem('Email'));
        setUserType(localStorage.getItem('UserType'));

    },[] );

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

    const handleDelete = async (id) => {
      try {
        const res = await axios.delete(`/users/delete/${id}`);
        alert(res.data.msg);
      } catch (err) {
        alert("ERR");
      }
    };

    function submitData(e) {
        e.preventDefault();
        const newRoute = {
              
          firstname,
          lastname,
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
            } else {
              swal("User account is safe!");
            }
          }).catch((err)=>{
    
            alert(err);
         })
      
    }

    return (
      <div className="updateTop">
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container-fluid ps-md-0 ">
          <div className="row g-0">
            <div className="d-none d-md-flex col-md-4 col-lg-6 updateimage"></div>
            <div className="col-md-8 col-lg-6">
              <div className="login d-flex align-items-center py-5">
                <div className="card-body p-md-5 text-black">
                  <form onSubmit={submitData}>
                    <h3 className="update-heading mb-6">{firstname + " " + lastname}</h3>
                    <div className="avatar">
                    <img src={image ? image : user.image} alt="" />
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
                    <hr className="hr1" />
                    <br />
                    <h4 className="register-heading mb-6">{userType + " "}Account</h4>
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
                            defaultValue={firstname}
                            className="form-control form-control-lg"
                            onChange={e=>{setFirstname(e.target.value);}}
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
                            defaultValue={lastname}
                            className="form-control form-control-lg"
                            onChange={e=>{setLastname(e.target.value);}}
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
                            defaultValue={username}
                            className="form-control form-control-lg"
                            onChange={e=>{setEmail(e.target.value);}}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" for="form3Example1m1">
                            Address
                          </label>
                          <input
                            type="address"
                            name="address"
                            placeholder="Home Address"
                            autocomplete="off"
                            // defaultValue={address}
                            className="form-control form-control-lg"
                            // onChange={e=>{setName(e.target.value);}}
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
                            defaultValue={email}
                            onChange={e=>{setUsername(e.target.value);}}
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
                            aria-label="Default select example"
                            onChange={e=>{setUserType(e.target.value);}}
                          >
                            <option selected>{userType}</option>
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
                        Update
                      </button>
                    </div>
                    <label className="register-heading mb-6" for="form3Example1m1">
                            Delete Account ?
                    </label>
                    <br />
                    <button
                        className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                        type="submit"
                        onClick={() => handleDelete(user._id)}
                        style={{ height: "50px" }}
                      >
                        Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Profile