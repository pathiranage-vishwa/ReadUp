import React, { useState, useEffect } from "react";
import axios from "axios";

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

    const deleteReview = async (id) =>{
        try {
            const res = await axios.delete(`/api/review/${id}`);
            alert(res.data.msg);
        }catch (err){
            alert("ERR");
        }
    };


    return (
        <div className="container " style={{ width: "100%" }}>
            <br/>
            <br/>
            <div className="card">
                <center>
                    <h1>DashBoard - Book Reviews </h1>
                </center>
            </div>

            <br />

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
            <br/> <br/> <br/> <br/>
        </div>
    );
}
