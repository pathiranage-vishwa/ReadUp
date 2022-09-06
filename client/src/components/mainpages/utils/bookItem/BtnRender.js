import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

function BtnRender({ book, deleteBook }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSeller] = state.userAPI.isSeller;
  const [isBuyer] = state.userAPI.isBuyer;
  const addCart = state.userAPI.addCart;
  const [user] = state.userAPI.user;

  return (
    <div className="row_btn">
      {isAdmin || user._id == book.seller_id ? (
        <>
          <Link
            id="btn_buy"
            to="#!"
            onClick={() => deleteBook(book._id, book.images.public_id)}
            className="btn btn-lg text-uppercase fw-bold mb-5"
          >
            Delete
          </Link>
          <Link
            id="btn_view"
            to={`/edit_product/${book._id}`}
            className="btn btn-lg  text-uppercase fw-bold mb-5"
          >
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link
            id="btn_buy"
            to="#!"
            onClick={() => addCart(book)}
            className="btn btn-lg  text-uppercase fw-bold mb-5"
          >
            Buy
          </Link>
          <Link
            id="btn_view"
            to={`/detail/${book._id}`}
            className="btn btn-lg  text-uppercase fw-bold mb-5"
          >
            View
          </Link>
        </>
      )}
    </div>
  );
}

export default BtnRender;
