import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import swal from "sweetalert";
import UpdateReq from "../requests/Styles/UpdateReq.png";
import { useHistory } from "react-router-dom";

export default function UpdateReview(){
    const history = useHistory();
    const state = useContext(GlobalState);
    const [token] = state.token;

    const [id,setId] = useState();
    const [rate,setRate] = useState();
    const [date,setDate] = useState()
    const [CommentReview,setCommentReview] = useState();
    const [user] = state.userAPI.user;

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
            userId: user._id,
            rate,
            date,
            CommentReview,
        };
        axios
            .put(`/api/review/${id}`, newReview)
            .then(() =>{
                swal("Done!", "Review Updated!!", "success");
                history.push("/review");
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
                        <h1>Update Book Reviews</h1>
                        <hr/>
                    </center>


                    <div className="row">
                        <div className="col-sm-6">
                            <img className="card-img-top" src={UpdateReq}  alt="Card image cap"/>
                        </div>

                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={createReview}>
                                        <br/>
                                        <label>Rate: </label>
                                        <div>
                                            <select className="form-select" defaultValue={rate} name="rate"
                                                    onChange={(e) => {setRate(e.target.value);}}>
                                                <option value="">Select</option>
                                                <option value="1">1 - Bad</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very good</option>
                                                <option value="5">5 - Excellent</option>
                                            </select>
                                        </div>
                                        <br/>

                                        <label>Date : </label>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="date"
                                                defaultValue={date}
                                                className="form-control form-control-lg"
                                                onChange={(e) => {
                                                    setDate(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                        <br/>

                                        <label>Comment Review: </label>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="CommentReview"
                                                defaultValue={CommentReview}
                                                className="form-control form-control-lg"
                                                onChange={(e) => {
                                                    setCommentReview(e.target.value);
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