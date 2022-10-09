import React from "react";
import BtnRender from "./BtnRender";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./cardItem.css";

function CardItem({ card, deleteCard }) {
  console.log(card);
  //console.log(isAdmin);
  return (
    <div className="card_display">
      {/* <input
          type="checkbox"
          checked={card.checked}
          onChange={() => handleCheck(card._id)}
        /> */}

      {/* <img src={card.images.url} alt="" /> */}
      <div className="product_box_card">
        <Cards
          expiry={card.ExDate}
          focused={card.cardType}
          name={card.cardHolderName}
          number={card.lastFourDigits}
        />
      </div>

      <BtnRender card={card} deleteCard={deleteCard} />
    </div>
  );
}

export default CardItem;
