import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import CardItem from "../utils/cardItem/CardItem";
import { useHistory } from "react-router-dom";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import "./displaycard.css";
import swal from "sweetalert";
//import Filters from "./Filters";
// import LoadMore from "./LoadMore";

function DisplayCards() {
  //const history = useHistory();
  const state = useContext(GlobalState);
  const [user] = state.userAPI.user;

  const [cards, setCards] = useState([]);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  //const [callback, setCallback] = state.cardsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [userId, setUserID] = useState("");
  const [status, setStatus] = useState(0);
  //const handleCheck = (id) => {
  //   cards.forEach((book) => {
  //     if (book._id === id) book.checked = !book.checked;
  //   });
  //   setCards([...cards]);
  // };

  //setUserID(user._id);
  const id = user._id;
  useEffect(() => {
    async function getDetails() {
      await axios
        .get(`http://localhost:5000/card/getMyCard/${id}`)
        .then((res) => {
          console.log(res.data);

          setCards(res.data);

          setStatus(1);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getDetails();
  }, [id]);

  // if (cards === undefined || cards.length == 0){

  // }

  console.log(id);

  const deleteCard = async (id) => {
    let ans = window.confirm("Do you really want to delete this Movie ?");

    if (ans) {
      try {
        setLoading(true);

        const deleteCard = axios.delete(
          `http://localhost:5000/card/delete/${id}`,
          {}
        );

        await deleteCard;
        //setCallback(!callback);
        swal("successfully remove the card");
        setLoading(false);
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
  };

  const checkAll = () => {
    cards.forEach((book) => {
      book.checked = !isCheck;
    });
    setCards([...cards]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    cards.forEach((book) => {
      if (book.checked) deleteCard(book._id);
    });
  };

  //   if (loading)
  //     return (
  //       <div>
  //         <Loading />
  //       </div>
  //     );

  console.log(cards);
  console.log(user._id);
  console.log(status);

  return (
    <>
      {/* <Filters /> */}
      {/* 
      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete ALL</button>
        </div>
      )} */}

      {/* <div style={{marginTop:"2%"}}>    */}

      {/* </div>    */}
      <div className="categoryTop">
        <div className="container-fluid ps-md-0 ">
          <div className="row g-0">
            <div className="d-none d-md-flex col-md-4 col-lg-6 savecard"></div>
            <div className="col-md-8 col-lg-6">
              <div className="login d-flex align-items-center py-5">
                <div className="card-body p-md-5 text-black">
                  <h3 className="category-heading mb-6">Save Cards Details</h3>
                  <hr className="disTopicHrCard" />
                  <div className="dis_card">
                    {cards.map((card, key) => {
                      return (
                        <div key={key}>
                          <CardItem
                            key={card._id}
                            card={card}
                            deleteCard={deleteCard}
                            // handleCheck={handleCheck}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <LoadMore />
      {cards.length === 0 && <Loading />} */}
    </>
  );
}

export default DisplayCards;
