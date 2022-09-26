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
