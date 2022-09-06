import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div className="container " style={{ width: "100%" }}>
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

      <div className="addform1">
        <h1 className="tabl-heading mb-4">ALL REQUESTS </h1>
      </div>

      {/* <a className="btn btn-warning" 
                            type="button"
                            href={`http://localhost:3000/report`}
                            style={{textDecoration:'none'}}>
                            <i></i>&nbsp;Generate Report
                            </a> */}

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
