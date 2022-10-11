import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function ManageReviews() {
  const [reviews, setReview] = useState([]);

  useEffect(() => {
    axios
      .get("/api/review")
      .then((res) => {
        setReview(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

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
            swal("Review Deleted successfully", {
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
    <div className="container " style={{ width: "100%" }}>
      <br />
      <br />
      <div className="card">
        <center>
          <h1>DashBoard - Book Reviews </h1>
        </center>
      </div>
      <br /> <br />
      <br />
      <table className="customers">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Rate</th>
            <th scope="col">Review</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              {/*<td>{data.Rusername}</td>*/}
              <td>{data.rate}</td>
              <td>{data.CommentReview}</td>
              <td>{data.date}</td>
              <td>
                <a
                  className="btn btn-danger"
                  onClick={() => deleteReview(data._id)}
                >
                  &nbsp;Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br /> <br /> <br /> <br />
    </div>
  );
}
