import React from "react";
import BtnRender from "./BtnRender";

function CardItem({ card,deleteCard}) {
  console.log(card);
  //console.log(isAdmin);
  return (
    <div className="product_card">
        {/* <input
          type="checkbox"
          checked={card.checked}
          onChange={() => handleCheck(card._id)}
        /> */}
      
      {/* <img src={card.images.url} alt="" /> */}

      <div className="product_box">
        <h5 title={card.cardNumber}>{card.cardNumber}</h5>
        <span>{card.ExDate}</span>
        <p>{card.cardHolderName}</p>
      </div>

      <BtnRender card={card} deleteCard={deleteCard} />
    </div>
  );
}

export default CardItem;
