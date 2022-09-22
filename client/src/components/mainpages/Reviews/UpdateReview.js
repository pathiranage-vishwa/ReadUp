import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import swal from "sweetalert";
import UpdateReq from "../requests/Styles/UpdateReq.png";

function UpdateReview(){
    const state = useContext(GlobalState);
    const [token] = state.token;

    const [id,setId] = useState();
    const [rate,setRate] = useState();
    const [date,setDate] = useState()
    const [CommentReview,setCommentReview] = useState();

    useEffect(()=>{
        setId(localStorage.getItem("reid"));
        setRate(localStorage.getItem("Rate"));
        setDate(localStorage.getItem("Date"));
        setCommentReview(localStorage.getItem("Comment"));
    }, []);

    const createReview = async (e)=>{
        e.preventDefault();
        const newReview = {
            id,
            rate,
            date,
            CommentReview,
        };
        axios
            .put(`/api/review/${id}`, newReview)
            .then(() =>{
                swal("Done!", "Review Updated!!", "success");
            })
            .catch((err)=>{
                alert(err);
            });
    };

    return(
        <div className="container">
            <br/>
            <div className="card">
                <div className="card-body">
                    <center>
                        <h1>Update Request Book Details</h1>
                        <hr/>
                    </center>


                    <div className="row">
                        <div className="col-sm-6">
                            <img className="card-img-top" src={UpdateReq}  alt="Card image cap"/>
                        </div>

                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={createRequest}>
                                        <br/>
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
                                        <br/>

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
                                        <br/>

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
                                        <br/>

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
                                        <br/>


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
    )

}