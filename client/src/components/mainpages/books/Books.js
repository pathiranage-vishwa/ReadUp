import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import BookItem from "../utils/bookItem/BookItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import Filters from "./Filters";
import LoadMore from "./LoadMore";
import swal from "sweetalert";

function Books() {
  const state = useContext(GlobalState);
  const [books, setBooks] = state.booksAPI.books;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.booksAPI.callback;
  const [loading, setLoading] = useState(false);

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
          setCallback(!callback);
          setLoading(false);

          swal("Book has been deleted!", {
            icon: "success",
          });
          window.location.reload(false);
        } else {
          swal("Terminate the deletion");
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
      <Filters />

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

      <LoadMore />
      {books.length === 0 && <Loading />}
    </>
  );
}

export default Books;
