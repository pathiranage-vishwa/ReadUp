import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import "./Styles/requests.css";
import axios from "axios";
import UpdateReq from "./Styles/UpdateReq.png";
import swal from "sweetalert";

function Requests() {
  const state = useContext(GlobalState);

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
        swal("Done!", "Request Updated!!", "success");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container">
      <br />
      <div className="card">
        <div className="card-body">
          <center>
            <h1>Update Request Book Details</h1>
            <hr />
          </center>

          <div className="row">
            <div className="col-sm-6">
              <img
                className="card-img-top"
                src={UpdateReq}
                alt="Card image cap"
              />
            </div>

            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={createRequest}>
                    <br />
                    <label>Book Name: </label>
                    <div className="form-group">
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
                    <br />

                    <label>Book Category : </label>
                    <div className="form-group">
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
                    <br />

                    <label>Book Author : </label>
                    <div className="form-group">
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
                    <br />

                    <label>ISBN Number: </label>
                    <div className="form-group">
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
                    <br />

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
    </div>
  );
}

export default Requests;
