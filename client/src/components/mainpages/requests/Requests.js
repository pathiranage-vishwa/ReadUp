import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import "./Styles/requests.css";
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
    <div className="categoryTop">
      <div className="container-fluid ps-md-0 ">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 categoryimage"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="card-body p-md-5 text-black">
                <form onSubmit={createRequest}>
                  <h3 className="category-heading mb-6">Create Request</h3>
                  <hr className="hr1" />
                  <br />
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" for="form3Example1m">
                        Book Name
                      </label>
                      <input
                        type="text"
                        name="bookName"
                        value={request.bookName}
                        className="form-control form-control-lg"
                        onChange={onChangeInput}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" for="form3Example1m">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={request.category}
                        className="form-control form-control-lg"
                        onChange={onChangeInput}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" for="form3Example1m">
                        Author
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={request.author}
                        className="form-control form-control-lg"
                        onChange={onChangeInput}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <label className="form-label" for="form3Example1m">
                        ISBN Number
                      </label>
                      <input
                        type="text"
                        name="isbnNumber"
                        value={request.isbnNumber}
                        className="form-control form-control-lg"
                        onChange={onChangeInput}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end pt-3">
                    <button
                      className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                      type="submit"
                      style={{ height: "50px" }}
                    >
                      Create
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

export default Requests;
