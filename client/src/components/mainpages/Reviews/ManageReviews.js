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
                    <th scope="col">Rate</th>
                    <th scope="col">Date</th>
                    <th scope="col">Review</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {reviews.map((data, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.rate}</td>
                        <td>{data.date}</td>
                        <td>{data.CommentReview}</td>
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
            <br/> <br/> <br/> <br/>
        </div>
    );
}
