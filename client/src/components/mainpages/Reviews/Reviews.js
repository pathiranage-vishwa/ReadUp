import React, {useState,useEffect} from "react";
import axios from "axios";
import reqBook from "../requests/Styles/reqBook.png";
import "./Styles/reviewStyle.css"

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

    const setData = (data) => {
        let { _id, rate, date,CommentReview } = data;

        localStorage.setItem("reid", _id);
        localStorage.setItem("Rate", rate);
        localStorage.setItem("Date", date);
        localStorage.setItem("Comment", CommentReview);

    };


    return(
        <div className="container">
            br/>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h3><center>
                                        Request Books
                                    </center></h3>
                                    <hr/>
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
                                    <div className="reviewStl">
                                        {reviews.map((data, index) => (

                                                <div className="card text-white bg-secondary mb-3">
                                                    <div className="card-body">
                                                        <h5 >{data.rate}</h5>
                                                        <span>{data.date}</span>
                                                        <p>{data.CommentReview}</p>
                                                        <a
                                                                className="btn btn-warning"
                                                                href={`/updatereview/${data._id}`}
                                                                onClick={() => setData(data)}
                                                            >
                                                                &nbsp;Update
                                                        </a>
                                                    </div>

                                            </div>
                                        ))}
                                        {/*</table>*/}
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
        {/*<div className="products">*/}
        {/*    /!*<table className="table table-bordered table table-dark ">*!/*/}
        {/*    /!*    <thead>*!/*/}
        {/*    /!*    <tr>*!/*/}
        {/*    /!*        <th scope="col">#</th>*!/*/}
        {/*    /!*        <th scope="col">Rate</th>*!/*/}
        {/*    /!*        <th scope="col">Date</th>*!/*/}
        {/*    /!*        <th scope="col">Comment</th>*!/*/}
        {/*    /!*    </tr>*!/*/}
        {/*    /!*    </thead>*!/*/}
        {/*        {reviews.map((data, index) => (*/}
        {/*            // <tbody key={index}>*/}
        {/*            // <tr>*/}
        {/*            //     <th scope="row">{index + 1}</th>*/}
        {/*            //     <td>{data.rate}</td>*/}
        {/*            //     <td>{data.date}</td>*/}
        {/*            //     <td>{data.CommentReview}</td>*/}
        {/*            // </tr>*/}
        {/*            // </tbody>*/}

        {/*            <div className="product_box">*/}
        {/*            <h5 >{data.rate}</h5>*/}
        {/*            <span>{data.date}</span>*/}
        {/*            <p>{data.CommentReview}</p>*/}
        {/*            </div>*/}
        {/*        ))}*/}
        {/*    /!*</table>*!/*/}
        {/*</div>*/}
