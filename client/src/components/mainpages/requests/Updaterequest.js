import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import "./Styles/requests.css";
import axios from "axios";

function Requests() {
  const state = useContext(GlobalState);
  //   const [categories] = state.categoriesAPI.categories;
  const [token] = state.token;
  //   const [callback, setCallback] = state.categoriesAPI.callback;

  const [id, setId] = useState();
  const [bookName, setBookName] = useState();
  const [category, setCategory] = useState();
  const [author, setAuthor] = useState();
  const [isbnNumber, setIsbnNumber] = useState();

  useEffect(() => {
    setId(localStorage.getItem("rid"));
    setBookName(localStorage.getItem("BookName"));
    setCategory(localStorage.getItem("Category"));
    setAuthor(localStorage.getItem("Author"));
    setIsbnNumber(localStorage.getItem("ISBN"));
  }, []);

  const createRequest = async (e) => {
    e.preventDefault();
    const newRequest = {
      id,
      bookName,
      category,
      author,
      isbnNumber,
    };
    axios
      .put(`/api/request/${id}`, newRequest)
      .then(() => {
        alert("Updated");
      })
      .catch((err) => {
        alert(err);
      });
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
                  <h3 className="category-heading mb-6">Update Request</h3>
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
                        defaultValue={bookName}
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setBookName(e.target.value);
                        }}
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
                        defaultValue={category}
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
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
                        defaultValue={author}
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setAuthor(e.target.value);
                        }}
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
                        defaultValue={isbnNumber}
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setIsbnNumber(e.target.value);
                        }}
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
                      Update
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
