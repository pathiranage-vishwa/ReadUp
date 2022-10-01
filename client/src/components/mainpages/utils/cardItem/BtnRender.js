import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

function BtnRender({ card, deleteCard }) {
  const state = useContext(GlobalState);

  return (
    <div className="row_btn_card">
      <>
        <Link
          id="btn_buy1"
          to="#!"
          onClick={() => deleteCard(card._id)}
          // className="btn btn-lg text-uppercase  mb-5"
        >
          Remove
        </Link>
      </>
    </div>
  );
}

export default BtnRender;
