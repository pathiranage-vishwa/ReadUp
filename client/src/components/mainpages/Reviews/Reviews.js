import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import reqBook from "../requests/Styles/reqBook.png";
import "./Styles/reviewStyle.css";
import Rating from "./Rating";
import swal from "sweetalert";
import { GlobalState } from "../../../GlobalState";

export default function Reviews() {
  const state = useContext(GlobalState);
  const [reviews, setReview] = useState([]);
  const [bookDetail, setBookDetail] = React.useState([]);
  const [image, setImage] = React.useState("");
  const [user] = state.userAPI.user;

  React.useEffect(() => {
    const bookDetails = JSON.parse(localStorage.getItem("bookDetails"));
    setBookDetail(bookDetails);
    const bookImage = JSON.parse(localStorage.getItem("bookImage"));
    setImage(bookImage);
  }, []);

  useEffect(() => {
    axios
      .get("/api/review/book/" + localStorage.getItem("bookID"))
      .then((res) => {
        setReview(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const setRData = (data) => {
    let { _id, rate, date, CommentReview } = data;

    localStorage.setItem("reid", _id);
    localStorage.setItem("Rate", rate);
    localStorage.setItem("Date", date);
    localStorage.setItem("Comment", CommentReview);
  };

  function deleteReview(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/api/review/${id}`)
          .then(() => {
            swal("Your Review Deleted successfully", {
              icon: "success",
            });
            window.location.reload(false);
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        swal("Deletion canceled!");
      }
    });
  }

  return (
    <div className="container">
      <br />
      <div className="card">
        <div className="card-body">
          <h1>
            <center>Book Reviews</center>
          </h1>
          <hr />
          <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="detail">
                    <img src={image} alt="" />
                    <div className="box-detail">
                      <div className="row">
                        <center>
                          <h2>{bookDetail.title}</h2>
                        </center>
                      </div>
                    </div>
                  </div>
                  <br /> <br />
                  <center>
                    <a
                      className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                      href="/addreview"
                      role="button"
                    >
                      Add Review
                    </a>
                  </center>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div>
                    {reviews.map((data, index) => (
                      <div className="card text-white bg-secondary mb-3">
                        <div className="card-body">
                          <Rating value={data.rate} />
                          <b>
                            <span>{data.date}</span>
                          </b>
                          <p>{data.CommentReview}</p>

                          <div className="d-flex justify-content-end pt-3">
                            {user._id === data.userId ? (
                              <a
                                className="btn btn-warning"
                                href={`/updatereview/${data._id}`}
                                onClick={() => setRData(data)}
                              >
                                &nbsp;Update
                              </a>
                            ) : null}
                            &nbsp;
                            {user._id === data.userId ? (
                              <a
                                className="btn btn-danger"
                                onClick={() => deleteReview(data._id)}
                              >
                                &nbsp;Delete
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
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
