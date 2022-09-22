import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import swal from "sweetalert";

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
        <div>

        </div>
    )

}