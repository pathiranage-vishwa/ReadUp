import React from "react";
import { Link } from "react-router-dom";

function BtnRender({ card, deleteCard }) {
  return (
    <div className="row_btn_card">
      <>
        <Link id="btn_buy1" to="#!" onClick={() => deleteCard(card._id)}>
          Remove
        </Link>
      </>
    </div>
  );
}

export default BtnRender;
