import React, {useState,useEffect} from "react";
import axios from "axios";
import reqBook from "../requests/Styles/reqBook.png";
import "./Styles/reviewStyle.css"
import Rating from "./Rating";

export default function Reviews(){
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

    const setRData = (data) => {
        let { _id, rate, date,CommentReview } = data;

        localStorage.setItem("reid", _id);
        localStorage.setItem("Rate", rate);
        localStorage.setItem("Date", date);
        localStorage.setItem("Comment", CommentReview);

    };


    return(
        <div className="container">
            <br/>
            <div className="card">
                <div className="card-body">
                    <h1><center>
                        Book Reviews
                    </center></h1>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <img className="card-img-top" src={reqBook}  alt="Card image cap"/>
                                    <br/>  <br/>
                                    <center>
                                        <a className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5" href="/request" role="button" >Go</a>
                                    </center>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        {reviews.map((data, index) => (

                                                <div className="card text-white bg-secondary mb-3" >
                                                    <div className="card-body">
                                                        <Rating value={data.rate} /><br/>
                                                        &nbsp;&nbsp;
                                                        <span>{data.date}</span>
                                                        <p>{data.CommentReview}</p>
                                                        <a
                                                            className="btn btn-warning"
                                                            href={`/updatereview/${data._id}`}
                                                            onClick={() => setRData(data)}
                                                        >
                                                            &nbsp;Update
                                                        </a>
                                                    </div>
                                                </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
