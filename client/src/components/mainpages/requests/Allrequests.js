import React, { useState, useEffect } from "react";
import axios from "axios";
import requestReport from "./requestReport"

export default function Allrequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("/api/request")
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const setData = (data) => {
    let { _id, bookName, category, author, isbnNumber } = data;

    localStorage.setItem("rid", _id);
    localStorage.setItem("BookName", bookName);
    localStorage.setItem("Category", category);
    localStorage.setItem("Author", author);
    localStorage.setItem("ISBN", isbnNumber);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/request/${id}`);
      alert(res.data.msg);
    } catch (err) {
      alert("ERR");
    }
  };

  const filterData = (prof, searchkey) => {
    const result = prof.filter(
      (profile) =>
        profile.name.toLowerCase().includes(searchkey) ||
        profile.name.includes(searchkey) ||
        profile.regNumber.toLowerCase().includes(searchkey) ||
        profile.regNumber.includes(searchkey) ||
        profile.role.toLowerCase().includes(searchkey) ||
        profile.role.includes(searchkey)
    );

    setRequests(result);
  };

  function hancdleSearchArea(e) {
    const searchkey = e.currentTarget.value;

    axios.get("/user/allUsers").then((res) => {
      if (res.data.success) {
        filterData(res.data.existingUsers, searchkey);
      }
    });
  }

  if (requests.length === 0)
  return (
    <h2 style={{ textAlign: "center", fontSize: "5rem" }}>No Requests</h2>
  );

  return (


    <div className="container " style={{ width: "100%" }}>
      <br/>
      <br/>
      <div className="card">
        <center>
          <h1>All Requests </h1>
        </center>
      </div>
      <br />

      <div className="allusers">
        <div className="row">

          <h5> Search Here </h5>
          <div className="col-lg-12  mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="search...( name, registration no, role)"
              name="search"
              onChange={hancdleSearchArea}
            ></input>
          </div>
        </div>
      </div>

      {/*<div className="addform1">*/}
      {/*  <center>*/}
      {/*    <h1 className="tabl-heading mb-4">All Requests </h1>*/}
      {/*  </center>*/}
      {/*</div>*/}

      <div >
        <a className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5" href="/requestHome" role="button" >Back</a>
      </div>

      <a className="btn btn-warning" 
                            type="button"
                            onClick={() => requestReport(requests)}
                            style={{textDecoration:'none'}}>
                            <i></i>&nbsp;Generate Report
                            </a>
      <br/>      <br/>

      <table className="customers">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Book Name</th>
            <th scope="col">Author</th>
            <th scope="col">Category</th>
            <th scope="col">ISBN Number</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.bookName}</td>
              <td>{data.author}</td>
              <td>{data.category}</td>
              <td>{data.isbnNumber}</td>
              <td>{data.status}</td>
              <td>
                <a
                  className="btn btn-warning"
                  href={`/updaterequest/${data._id}`}
                  onClick={() => setData(data)}
                >
                  &nbsp;Update
                </a>
                &nbsp;
                <a
                  className="btn btn-danger"
                  onClick={() => handleDelete(data._id)}
                >
                  &nbsp;Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/> <br/> <br/> <br/> <br/>
    </div>
  );
}
