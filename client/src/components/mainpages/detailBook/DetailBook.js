import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import BookItem from "../utils/bookItem/BookItem";

function DetailBook() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [books] = state.booksAPI.books;
  const addCart = state.userAPI.addCart;
  const [detailBook, setDetailBook] = useState([]);

  useEffect(() => {
    if (params.id) {
      books.forEach((book) => {
        if (book._id === params.id) setDetailBook(book);
      });
    }
  }, [params.id, books]);

  if (detailBook.length === 0) return null;

  return (
    <>
      <div className="detail">
        <img src={detailBook.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{detailBook.title}</h2>
            <h6>#id: {detailBook.product_id}</h6>
          </div>
          <span>$ {detailBook.price}</span>
          <p>{detailBook.description}</p>
          <p>{detailBook.content}</p>
          <p>Sold: {detailBook.sold}</p>
          <Link to="/cart" className="cart" onClick={() => addCart(detailBook)}>
            Add to Cart
          </Link>
          <Link to="/cart" className="cart" onClick={() => addCart(detailBook)}>
            Buy Now
          </Link>
        </div>
      </div>

      <div>
        <h2>Related books</h2>
        <div className="books">
          {books.map((book) => {
            return book.category === detailBook.category ? (
              <BookItem key={book._id} book={book} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default DetailBook;