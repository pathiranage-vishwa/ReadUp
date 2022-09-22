import React, {useState,useContext} from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import swal from "sweetalert";
import req from "../requests/Styles/req.png";


function AddReview(){
    const state = useContext(GlobalState);
    const [token] = state.token;

    const [review,setReview] = useState({
        rate: "",
        date: "",
        CommentReview:""
    });

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const createReview = async (e) => {
        e.preventDefault();
        console.log(review);
        try {
            const res = await axios.post(
                "/api/review",
                { ...review },
                {
                    headers: { Authorization: token },
                }
            );
            swal("Done!", "Request successfully!", "success");
            // alert(res.data.msg);
            //move to request home
            setReview("");
            //   setCallback(!callback);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (

        <div className="container">
            <br/>
            <div className="card">
                <div className="card-body">
                    <center>
                        <h1>Add Book Review</h1>
                        <hr/>
                    </center>


                    <div className="row">
                        <div className="col-sm-6">
                            <img className="card-img-top" src={req}  alt="Card image cap"/>
                        </div>

                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={createReview}>
                                        <br/>
                                        <label>Rate: </label>
                                        <div>
                                            <select className="form-select" value={review.rate} name="rate" onChange={onChangeInput}>
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
                                            <input type="date" className="form-control"
                                                   value={review.date}
                                                   name="date"
                                                   onChange={onChangeInput}
                                                   required/>
                                        </div>
                                        <br/>

                                        <label>Comment Review : </label>
                                        <div className="form-group">
                                            <textarea className="form-control" id="exampleFormControlTextarea1"
                                                      rows="3"
                                                      value={review.CommentReview}
                                                      name="CommentReview"
                                                      onChange={onChangeInput}
                                                      required >

                                            </textarea>
                                        </div>
                                        <br/>


                                        <div className="d-flex justify-content-end pt-3">
                                            <button
                                                className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                                                type="submit"
                                                style={{ height: "50px" }}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/> <br/>
        </div>


    )
}
export default AddReview;
