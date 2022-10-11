import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import CardItem from "../utils/cardItem/CardItem";
import { useHistory } from "react-router-dom";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import "./displaycard.css";
import swal from "sweetalert";

function DisplayCards() {
  const state = useContext(GlobalState);
  const [user] = state.userAPI.user;

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [status, setStatus] = useState(0);

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
        swal("successfully remove the card");
        setLoading(false);
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
  };

  console.log(cards);
  console.log(user._id);
  console.log(status);

  return (
    <>
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
    </>
  );
}

export default DisplayCards;
