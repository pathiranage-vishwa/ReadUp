import React, { useContext, useState, useEffect } from "react";

import axios from "axios";

import "react-phone-number-input/style.css";
import swal from "sweetalert";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { GlobalState } from "../../../GlobalState.js";
import styled from "styled-components";
import Paypal from "../cart/Paypal.js";
import "./addPayment.css";
import { Box, MenuItem, Select } from "@material-ui/core";

const AddPayment = () => {
  const state = useContext(GlobalState);
  const [user] = state.userAPI.user;
  const [cardType, setcardType] = useState("Master Card");
  const [cardHolderName, setcardHolderName] = useState("");
  const [cardNumber, setcardNumber] = useState("");
  const [expirationDate, setexpirationDate] = useState("");
  const [cardSecurityCode, setcardSecurityCode] = useState("");
  const [cart] = state.userAPI.cart;
  const [cards, setCards] = useState([]);

  console.log(user);

  const order_id = Date().toLocaleString();
  const Username = user.Username;
  const user_id = user._id;
  const email = user.email;
  // const cart = user.cart;

  const [PaymentType] = useState("card");
  const [saveCard, setSaveCard] = useState("notSaved");

  const phoneNumber = localStorage.getItem("PNumber");
  const name = localStorage.getItem("Name");
  const address = localStorage.getItem("Address");
  const country = localStorage.getItem("Country");
  const postalCode = localStorage.getItem("PCode");
  const [transfer_amount, setTransfer_amount] = useState(
    localStorage.getItem("Total")
  );

  // const addToCart = async (cart) =>{
  //     await axios.patch('/user/addcart', {cart}, {
  //         headers: {Authorization: token}
  //     })
  // }
  const id = user._id;
  useEffect(() => {
    async function getDetails() {
      await axios
        .get(`http://localhost:5000/card/getMyCard/${id}`)
        .then((res) => {
          console.log(res.data);
          setCards(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getDetails();
  }, [id]);

  const cardPayment = async (e) => {
    e.preventDefault();

    const data = {
      cardHolderName,
      cardNumber,
      expirationDate,
      order_id,
      transfer_amount,
      cardSecurityCode,
      // email
    };
    try {
      await axios.post("http://localhost:7000/cardPay/addpayment", data);
      // navigate("/ViewDetails")
      swal("successfully add card payment");

      //    cart.forEach((item, index) => {
      //     if(item._id === id){
      //         cart.splice(index, 1)
      //     }
      // })
      // setCart({})
      // addToCart(cart)

      let ans = window.confirm("Do you want to save card details ?");

      if (ans) {
        const data = {
          cardHolderName,
          cardNumber,
          expirationDate,
          cardSecurityCode,
          cardType,
          user_id,
        };
        try {
          await axios.post("/card/add", data);
          // navigate("/ViewDetails")
          swal("saved card details");
        } catch (error) {
          console.log(error);
          swal("card  save failed");
        }
      }

      const dataAdd = {
        PaymentType,
        Username,
        cardNumber,
        order_id,
        email,
        transfer_amount,
      };
      try {
        axios.post("http://localhost:7000/cardPay/payment", dataAdd);
        // navigate("/ViewDetails")
        swal("successfully save card payment");
        orderPalce();
        setTransfer_amount(0);
      } catch (error) {
        console.log(error);
        swal("card payment save failed");
      }
    } catch (error) {
      swal("card payment failed");
      console.log(error);
    }
  };

  function orderPalce() {
    const reserDataAdd = {
      user_id,
      name,
      email,
      paymentID: order_id,
      address,
      country,
      postalCode,
      phoneNumber,
      cart,
      transfer_amount,
    };
    try {
      axios.post("/api/order", reserDataAdd);
      // navigate("/ViewDetails")
      swal("successfully place the order");
      setTransfer_amount(0);
      // history.push("/");
    } catch (error) {
      console.log(error);
      swal("reservaion save faild");
    }
  }

  async function saveCardPayment() {
    const data = {
      saveCard,
      transfer_amount,

      // email
    };
    try {
      await axios.post("http://localhost:7000/cardPay/saveCardPayment", data);
      // navigate("/ViewDetails")
      swal("successfully add card payment");

      //    cart.forEach((item, index) => {
      //     if(item._id === id){
      //         cart.splice(index, 1)
      //     }
      // })
      // setCart({})
      // addToCart(cart);

      const dataAdd = {
        PaymentType,
        Username,
        cardNumber: saveCard,
        order_id,
        email,
        transfer_amount,
      };
      try {
        axios.post("http://localhost:7000/cardPay/payment", dataAdd);
        // navigate("/ViewDetails")
        swal("successfully save card payment");
        orderPalce();
        setTransfer_amount(0);
      } catch (error) {
        console.log(error);
        swal("card payment save failed");
      }
    } catch (error) {
      swal("card payment failed");
      console.log(error);
    }
  }

  // console.log(crrUser)

  return (
    <div>
      <center style={{ marginTop: "20px" }}>
        <h3 className="category-heading mb-6">
          <b>Payment</b>
        </h3>
      </center>
      <hr className="disTopicHr1" />
      <div className="addPayments">
        <React.Fragment>
          <form>
            <div class="card" style={{ marginTop: "10px" }}>
              <Form>
                <form onSubmit={cardPayment}>
                  <div class="d-flex justify-content-between px-3 pt-4">
                    <Box mb={2}>
                      <Typography variant="h6" gutterBottom>
                        <b> CARD PAYMENT</b>
                      </Typography>
                    </Box>
                    <div class="amount">
                      <div class="inner">
                        <span class="dollar">TOTAL</span>
                        {/* //need to change with session */}
                        <span class="total">
                          <b>LKR.{transfer_amount}</b>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between px-3 pt-4">
                    <div>
                      {/* <label for="iText" class="exptxt">Payment Type</label> */}
                      {/* <input type="text" class="form-control" value={cardType} onChange={e=> setcardType(e.target.value)} required/> */}
                      <Grid item xs={12}>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          label="Payment Type"
                          id="payment_type"
                          name="payment_type"
                          //class="form-control"
                          value={saveCard}
                          onChange={(e) => setSaveCard(e.target.value)}
                          required
                        >
                          <MenuItem value="notSaved" selected="selected">
                            Select Save Card
                          </MenuItem>
                          {cards.map((card, key) => (
                            <MenuItem value={card.cardNumber}>
                              {card.lastFourDigits}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </div>
                  </div>
                  {saveCard === "notSaved" ? (
                    <div class="d-flex justify-content-between px-3 pt-4">
                      <div>
                        {/* <input type="text" class="form-control" value={cardType} onChange={e=> setcardType(e.target.value)} required/> */}
                        <Grid item xs={12}>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            label="Card Type"
                            id="card_type"
                            value={cardType}
                            onChange={(e) => setcardType(e.target.value)}
                            required
                          >
                            <MenuItem value="Master Card">Master Card</MenuItem>
                            <MenuItem value="VISA Card">VISA Card</MenuItem>
                          </Select>
                        </Grid>
                      </div>

                      <div>
                        {/* <label for="iText" class="iTxt">Name on Card</label> */}
                        <Grid item xs={12} md={12}>
                          <TextField
                            label="Name on Card"
                            type="text"
                            fullWidth
                            value={cardHolderName}
                            onChange={(e) => setcardHolderName(e.target.value)}
                            required
                          />
                        </Grid>
                      </div>
                    </div>
                  ) : null}
                  {saveCard === "notSaved" ? (
                    <div class="px-3 pt-3">
                      {/* <label for="card number" class="iTxt">CARD NUMBER</label> */}
                      <Grid item xs={12} md={12}>
                        <TextField
                          label="Card Number"
                          type="number"
                          fullWidth
                          placeholder="8881 2545 2545 2245"
                          value={cardNumber}
                          onChange={(e) => setcardNumber(e.target.value)}
                          required
                        />
                      </Grid>
                    </div>
                  ) : null}
                  {saveCard === "notSaved" ? (
                    <div class="d-flex justify-content-between px-3 pt-4">
                      <div>
                        {/* <label for="date" class="exptxt">Expiration Date</label> */}
                        {/* <input type="date"  class="form-control " placeholder="MM / YY"/> */}
                        <Grid item xs={12} md={12}>
                          <TextField
                            type="text"
                            label="Expiration Date"
                            fullWidth
                            value={expirationDate}
                            onChange={(e) => setexpirationDate(e.target.value)}
                            required
                          />
                        </Grid>
                      </div>

                      <div>
                        {/* <label for="iText" class="iTxt">CVV /CVC</label> */}
                        <Grid item xs={12} md={12}>
                          <TextField
                            type="number"
                            fullWidth
                            label="CVV /CVC"
                            placeholder="123"
                            value={cardSecurityCode}
                            onChange={(e) =>
                              setcardSecurityCode(e.target.value)
                            }
                            required
                          />
                        </Grid>
                      </div>
                    </div>
                  ) : null}{" "}
                  {saveCard === "notSaved" ? (
                    <div className="d-flex justify-content-end pt-3">
                      <button
                        className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                        type="submit"
                        style={{
                          marginLeft: "330px",
                          marginTop: "10px",
                          height: "50px",
                          width: "100px",
                        }}
                      >
                        Pay
                      </button>
                    </div>
                  ) : null}
                  {saveCard !== "notSaved" ? (
                    <div className="d-flex justify-content-end pt-3">
                      <button
                        className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                        type="button"
                        style={{
                          marginLeft: "330px",
                          marginTop: "10px",
                          height: "50px",
                          width: "100px",
                        }}
                        onClick={saveCardPayment}
                      >
                        Pay
                      </button>
                    </div>
                  ) : null}
                </form>
              </Form>
            </div>
          </form>
        </React.Fragment>
        <div>
          <div
            className="paypal form"
            class="card"
            style={{ marginTop: "15px", height: "30%" }}
          >
            <div class="amount">
              <div class="inner">
                <span class="dollar">
                  <b>TOTAL LKR.{transfer_amount}</b>
                </span>
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <center>
                <Paypal total={transfer_amount} />
              </center>
            </div>
          </div>
          <div
            className="cashOnForm"
            class="card"
            style={{ width: "300px", height: "180px", marginTop: "30%" }}
          >
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>
                <b> Cash On Delivery</b>
              </Typography>
            </Box>
            <hr className="disTopicHr2" />
            <div class="amount">
              <div class="inner">
                <span class="dollar">
                  <b>TOTAL LKR.{transfer_amount}</b>
                </span>
              </div>
              <form onSubmit={orderPalce}>
                <div className="row" style={{ marginTop: "20px" }}>
                  <button
                    className="btn btn-lg btn-success btn-login text-uppercase fw-bold mb-5"
                    type="submit"
                    style={{
                      marginLeft: "60%",
                      marginTop: "10px",
                      height: "50px",
                      width: "100px",
                    }}
                  >
                    Buy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Form = styled.div`
  width: 100%;
  padding: 50px;
  background: #f2f2f2;
  border-radius: 15px;
  box-shadow: 10px 10px 10px 0;
  text-align: left;
`;

export default AddPayment;

{
  /* <label for="card number" class="d-flex justify-content-between">
<span class="labeltxt">CARD NUMBER</span>
<img src="images/mastercard-logo.png" width="25" class="image">
</label> */
}
