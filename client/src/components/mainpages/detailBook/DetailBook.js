import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import BookItem from "../utils/bookItem/BookItem";

function DetailBook() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [books] = state.booksAPI.books;
  const addCart = state.userAPI.addCart;
  const addWishList = state.userAPI.addWishList;
  const [detailBook, setDetailBook] = useState([]);

  //set to local storage
  const setDetails = (detailBook) => {
    localStorage.setItem("bookDetails", JSON.stringify(detailBook));
    //set image to local storage
    localStorage.setItem("bookImage", JSON.stringify(detailBook.images.url));
    localStorage.setItem("bookID", detailBook._id);
  };

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
      <center>
        <h3 className="bookDetails-heading mb-6">
          {" "}
          <b>Book Details </b>
        </h3>

        <br />
      </center>
      <div className="detail">
        <img src={detailBook.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{detailBook.title}</h2>
            <h6> {detailBook.product_id}</h6>
          </div>
          <span>LKR {detailBook.price}</span>
          <p>{detailBook.description}</p>
          <p>{detailBook.content}</p>
          {/* <p>Sold: {detailBook.sold}</p> */}

          <Link to="/cart" className="cart" onClick={() => addCart(detailBook)}>
            Buy Now
          </Link>
          <Link
            to="/cart"
            className="btnDetail"
            onClick={() => addCart(detailBook)}
          >
            Add to Cart
          </Link>
        </div>
      </div>
      <div>
        <Link
          to="#"
          className="btnDetailwishlist"
          onClick={() => addWishList(detailBook)}
        >
          Add to Wishlist
        </Link>
        <Link
          to="/review"
          className="btnReviewDetail ms-3 "
          onClick={() => setDetails(detailBook)}
        >
          Reviews
        </Link>
      </div>
      <br />
      <br />
      <br />
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
