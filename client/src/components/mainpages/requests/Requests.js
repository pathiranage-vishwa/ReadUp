import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import "./Styles/requests.css";
import req from "./Styles/req.png"
import axios from "axios";

function Requests() {
  const state = useContext(GlobalState);
  //   const [categories] = state.categoriesAPI.categories;
  const [token] = state.token;
  //   const [callback, setCallback] = state.categoriesAPI.callback;

  const [request, setRequest] = useState({
    bookName: "",
    category: "",
    author: "",
    isbnNumber: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const createRequest = async (e) => {
    e.preventDefault();
    console.log(request);
    try {
      const res = await axios.post(
          "/api/request",
          { ...request },
          {
            headers: { Authorization: token },
          }
      );
      alert(res.data.msg);
      setRequest("");
      //   setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (

      <div className="container">
        <br/>
        <div className="card">
          <div className="card-body">
            <center>
              <h1>Request Book</h1>
              <hr/>
            </center>


            <div className="row">
              <div className="col-sm-6">
                {/* <div className="card"> */}
                {/* <div className="d-none d-md-flex col-md-4 col-lg-6 requestimage"></div> */}
                <img className="card-img-top" src={req}  alt="Card image cap"/>
                {/* <div className="card-body">
                                    </div> */}
                {/* </div> */}
              </div>

              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={createRequest}>
                      <label>Book Name: </label>
                      <div className="form-group">
                        <input type="text" className="form-control"
                               value={request.bookName}
                               name="bookName"
                               onChange={onChangeInput}
                               required/>
                      </div>

                      <label>Book Category : </label>
                      <div className="form-group">
                        <input type="text" className="form-control"
                               value={request.category}
                               name="category"
                               onChange={onChangeInput}
                               required/>
                      </div>

                      <label>Book Author : </label>
                      <div className="form-group">
                        <input type="text" className="form-control"
                               value={request.author}
                               name="author"
                               onChange={onChangeInput}
                               required/>
                      </div>

                      <label>ISBN Number: </label>
                      <div className="form-group">
                        <input type="text" className="form-control"
                               value={request.isbnNumber}
                               name="isbnNumber"
                               onChange={onChangeInput}
                               required/>
                      </div>


                      <div className="d-flex justify-content-end pt-3">
                        <button
                            className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                            type="submit"
                            style={{ height: "50px" }}
                        >
                          Request
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  )
}

export default Requests;
