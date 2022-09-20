import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import BookItem from "../utils/bookItem/BookItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";
// import Filters from "./Filters";
// import LoadMore from "./LoadMore";

function Books() {
  const state = useContext(GlobalState);
  const [books, setBooks] = useState([]);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  //   const [callback, setCallback] = state.booksAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
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

  const handleCheck = (id) => {
    books.forEach((book) => {
      if (book._id === id) book.checked = !book.checked;
    });
    setBooks([...books]);
  };

  const deleteBook = async (id, public_id) => {
    try {
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

      await destroyImg;
      await deleteBook;
      //setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    books.forEach((book) => {
      book.checked = !isCheck;
    });
    setBooks([...books]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    books.forEach((book) => {
      if (book.checked) deleteBook(book._id, book.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      {/* <Filters /> */}
      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete ALL</button>
        </div>
      )}
      <div className="products">
        {books.map((book) => {
          return (
            <BookItem
              key={book._id}
              book={book}
              isAdmin={isAdmin}
              deleteBook={deleteBook}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>
      Total ads : {adscount}
      {/* <LoadMore /> */}
      {/* {books.length === 0 && <Loading />} */}
    </>
  );
}

export default Books;
