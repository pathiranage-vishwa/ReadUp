import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/updateUser.css";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

//userprofile

function UserProfile() {
  const history = useHistory();
  const [id, setId] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [userType, setUserType] = useState();

  //Get data from local storage when the page first renders
  useEffect(() => {
    setId(localStorage.getItem("uid"));
    setFirstname(localStorage.getItem("FirstName"));
    setLastname(localStorage.getItem("LastName"));
    setUsername(localStorage.getItem("UserName"));
    setEmail(localStorage.getItem("Email"));
    setUserType(localStorage.getItem("UserType"));
  }, []);

  //API call for delete
  const handleDelete = async (id) => {
    try {
      //confirm alert not swal
      const confirm = window.confirm("Are you sure?");
      if (confirm) {
        await axios.delete(`/user/delete/${id}`).then(() => {
          swal("User account deleted successfully!", {
            icon: "success",
          }).catch((err) => {
            alert(err);
          });
        });
      }
      history.push("/");
    } catch (err) {
      alert(err.message);
    }
  };
  //     const res = await axios.delete(`/user/delete/${id}`).then(()=>{
  //       alert("res.data.msg")
  //     }).catch((err)=>{
  //       alert(err)
  //     });
  //   } catch (err) {
  //     alert(err)
  //   }
  // };

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
                <form>
                  <h3 className="update-heading mb-6">
                    {firstname + " " + lastname}
                  </h3>
                  <hr className="hr1" />
                  <br />
                  <h4 className="register-heading mb-6">
                    {userType + " "}Account
                  </h4>
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
                          disabled={true}
                          className="form-control form-control-lg"
                          onChange={(e) => {
                            setFirstname(e.target.value);
                          }}
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
                          disabled={true}
                          defaultValue={lastname}
                          className="form-control form-control-lg"
                          onChange={(e) => {
                            setLastname(e.target.value);
                          }}
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
                          autoComplete="off"
                          defaultValue={username}
                          disabled={true}
                          className="form-control form-control-lg"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          required
                        />
                      </div>
                    </div>
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
                          disabled={true}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          className="form-control form-control-lg"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div>
                        <label className="form-label" for="form3Example1m1">
                          User Type
                        </label>
                        <select
                          name="userType"
                          disabled={true}
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => {
                            setUserType(e.target.value);
                          }}
                        >
                          <option selected>{userType}</option>
                          <option value="Buyer">Buyer</option>
                          <option value="Seller">Seller</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end pt-3">
                    <Link to={`/updateProfile/${id}`}>
                      <button
                        className="btn btn-lg btn-success btn-profupdate text-uppercase fw-bold mb-5"
                        style={{ height: "50px", width: "150px" }}
                      >
                        Update
                      </button>
                    </Link>
                  </div>
                  <label
                    className="register-heading mb-6"
                    for="form3Example1m1"
                  >
                    Delete Account ?
                  </label>
                  <br />

                  <button
                    className="btn btn-lg btn-success btn-Delprof text-uppercase fw-bold mb-5"
                    onClick={() => handleDelete(id)}
                    style={{ height: "50px", width: "120px" }}
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

export default UserProfile;
