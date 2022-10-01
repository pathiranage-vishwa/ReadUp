import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./Styles/paginate.css";
import "./Styles/table.css";

const PER_PAGE = 10;

//All users page

export default function AllUsers() {
  const [profile, setprofile] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios
      .get("/user/allUsers")
      .then((res) => {
        setprofile(res.data.existingUsers);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

    const setData = (data) => {
      let { _id, firstName, lastName, username, email, userType } =
        data;

      localStorage.setItem("uid", _id);
      localStorage.setItem("FirstName", firstName);
      localStorage.setItem("LastName", lastName);
      localStorage.setItem("UserName", username);
      localStorage.setItem("Email", email);
      localStorage.setItem("UserType", userType);
    };

  function handlePageClick({ selected: selectedPage }) {
    console.log("selectedPage", selectedPage);
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;

  // const currentPageData = profile
  //   .slice(offset, offset + PER_PAGE)
  //   .map((data, index) => <img key={index} {data.firstName + " " + data.lastName} />);

  // console.log(currentPageData);

  const pageCount = Math.ceil(profile.length / PER_PAGE);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/users/delete/${id}`);
      alert(res.data.msg);
    } catch (err) {
      alert("ERR");
    }
  };

  const filterData = (prof, searchkey) => {
    const result = prof.filter(
      (profile) =>
        profile.firstName.toLowerCase().includes(searchkey) ||
        profile.firstName.includes(searchkey) ||
        profile.username.toLowerCase().includes(searchkey) ||
        profile.username.includes(searchkey) ||
        profile.email.toLowerCase().includes(searchkey) ||
        profile.email.includes(searchkey)
    );

    setprofile(result);
  };

  async function hancdleSearchArea(e) {
    const searchkey = e.currentTarget.value;

    const res = await axios.get("/user/allUsers").then((res) => {
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
              placeholder="search...( name,email)"
              name="search"
              onChange={hancdleSearchArea}
            ></input>
          </div>
        </div>
      </div>

      <div className="addform1">
        <h1 className="tabl-heading mb-4">REGISTERED USERS </h1>
      </div>

      <a className="btn-tbl" 
                            type="button"
                            href={`http://localhost:3000/report`}
                            style={{textDecoration:'none'}}>
                            <i></i>&nbsp;Generate Report
                            </a>
                            <br />      <br />
      <table className="customers">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">User Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {profile.slice(offset, offset + PER_PAGE).map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.firstName + " " + data.lastName}</td>
              <td>{data.username}</td>
              <td>{data.email}</td>
              <td>{data.userType}</td>

              <td>
                <a
                  className="btn-tbl"
                  href={`/userProfile/${data._id}`}
                    onClick={() => setData(data)}
                >
                  &nbsp;Update
                </a>
                &nbsp;
                <a className="btn-tb2" onClick={() => handleDelete(data._id)}>
                  &nbsp;Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />

      <ReactPaginate
        previousLabel={"« previous"}
        nextLabel={"next »"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeLinkClassName={"pagination__link--active"}
      />
    </div>
  );
}
