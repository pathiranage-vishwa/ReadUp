import React, { useContext,useState, useEffect } from "react";
import axios from "axios";
import requestReport from "./requestReport"
import { GlobalState } from "../../../GlobalState";

export default function Allrequests() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSeller] = state.userAPI.isSeller;
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

  const setData = (id) => {
    const status = "accepted";
    const newRequest = {
      status,
    };
    console.log(newRequest);
    axios
      .put(`/api/managerequest/${id}`, newRequest)
      .then(() => {
        alert("Updated");
      })
      .catch((err) => {
        alert(err);
      });
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
          <h1>DashBoard - Request Books </h1>
        </center>
      </div>

      <br />
      <div className="allusers">
        <div className="row">
          <h4> Search here </h4>
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
            {isSeller ?
            <th scope="col">Action</th>
            :null}
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
              {isSeller ?
              <td>
                <a
                  className="btn btn-warning"
                  onClick={() => setData(data._id)}
                >
                  &nbsp;Accept
                </a>
                &nbsp;
                <a
                  className="btn btn-danger"
                  onClick={() => handleDelete(data._id)}
                >
                  &nbsp;Decline
                </a>
              </td>
              :null}
            </tr>
          ))}
        </tbody>
      </table>
      <br/> <br/> <br/> <br/>
    </div>
  );
}
