import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import BookItem from "../utils/bookItem/BookItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import swal from "sweetalert";
import "./MyAds.css";

function Books() {
  const state = useContext(GlobalState);
  const [books, setBooks] = useState([]);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [loading, setLoading] = useState(false);
  const [userId] = state.userAPI.user;
  var adscount = 0;

  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get(`/api/book/${userId._id}`);
      setBooks(res.data);
    };
    getBooks();
  }, [userId]);

  adscount = books.length;
  console.log(adscount);

  const deleteBook = async (id, public_id) => {
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this add",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          setLoading(true);
          const destroyImg = axios.post(
            "/api/destroy",
            { public_id },
            {
              headers: { Authorization: token },
            }
          );
          const deleteBook = axios.delete(`/api/book/${id}`, {
            headers: { Authorization: token },
          });

          const execute = async () => {
            await destroyImg;
            await deleteBook;
          };
          execute();
          setLoading(false);

          swal("Book has been deleted!", {
            icon: "success",
          });
          window.location.reload(false);
        } else {
          swal("Terminate deletion");
        }
      });
    } catch (err) {
      swal(err.response.data.msg);
    }
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      <div className="myads1">
        <h2>{userId.firstName}'s Ads</h2>
      </div>
      <div className="NumAds">
        <h3>Number Of Ads : {adscount} </h3>
      </div>
      <div className="products">
        {books.map((book) => {
          return (
            <BookItem
              key={book._id}
              book={book}
              isAdmin={isAdmin}
              deleteBook={deleteBook}
            />
          );
        })}
      </div>
    </>
  );
}

export default Books;
