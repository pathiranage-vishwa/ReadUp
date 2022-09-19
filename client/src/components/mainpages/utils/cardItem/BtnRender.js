import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

function BtnRender({ card, deleteCard }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSeller] = state.userAPI.isSeller;
  const [isBuyer] = state.userAPI.isBuyer;
  const addCart = state.userAPI.addCart;
  const [user] = state.userAPI.user;

  return (
    <div className="row_btn_card">
      
        <>
          <Link
            id="btn_buy"
            to="#!"
            onClick={() => deleteCard(card._id, card.images.public_id)}
            // className="btn btn-lg text-uppercase  mb-5"
          >
            Delete
          </Link>
        
        </>
    </div>
  );
}

export default BtnRender;
