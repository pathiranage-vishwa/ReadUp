import React from "react";
import BtnRender from "./BtnRender";

function BookItem({ book, isAdmin, deleteBook, handleCheck }) {
  console.log(book);
  console.log(isAdmin);
  return (
    <div className="product_card">
      {/* {isAdmin && (
        <input
          type="checkbox"
          checked={book.checked}
          onChange={() => handleCheck(book._id)}
        />
      )} */}
      <img src={book.images.url} alt="" />

      <div className="product_box">
        <h5 title={book.title}>{book.title}</h5>
        <span>${book.price}</span>
        <p>{book.description}</p>
      </div>

      <BtnRender book={book} deleteBook={deleteBook} />
    </div>
  );
}

export default BookItem;
