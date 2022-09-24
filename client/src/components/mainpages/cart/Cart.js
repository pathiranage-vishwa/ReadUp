import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import { Add, Remove, Delete } from "@material-ui/icons";
import styled from "styled-components";
import { useHistory } from "react-router";
import { mobile } from "../../homepage/responsive";
import swal from "sweetalert";
import { useParams, Link } from "react-router-dom";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  border: 0.5px solid lightgray;
  padding: 20px;
  width: 1250px;
  border-radius: 10px;
  justify-content: space-between;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  height: 50px;
  padding: 10px;
  background-color: #100360;
  color: white;
  font-weight: 600;
  font-size: 20px;
`;

function Cart() {
  const state = useContext(GlobalState);
  const [wishList, setWishList] = state.userAPI.wishList;
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    swal({
      title: "Are you sure?",
      text: "The selected book will be deleted from the cart!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        cart.forEach((item, index) => {
          if (item._id === id) {
            cart.splice(index, 1);
          }
        });

        setCart([...cart]);
        addToCart(cart);
      } else {
        swal("Selected Book is safe!");
      }
    });
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order.");
  };

  const setProduct = () => {
    localStorage.setItem("Cart", JSON.stringify(cart));
    localStorage.setItem("Total", total);
  };

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    );

  return (
    <Container>
      <Wrapper>
        <Title>YOUR SHOPPING CART</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <Link to="/cart">
            <TopButton>Shopping Cart({cart.length})</TopButton>
            </Link>
            <Link to="/wishlist">
            <TopButton>Your Wishlist ({wishList.length})</TopButton>
            </Link>
          </TopTexts>
          <TopButton>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.images.url} />
                  <Details>
                    <ProductName>
                      <b>Book:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>Author:</b> {product.author}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>description:</b> {product.description}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <div className="amount">
                      <button onClick={() => decrement(product._id)}>
                        <Remove />{" "}
                      </button>
                      <span>{product.quantity}</span>
                      <button onClick={() => increment(product._id)}>
                        <Add />{" "}
                      </button>
                    </div>
                  </ProductAmountContainer>
                  <ProductPrice>
                    LKR {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
                <div
                  className="delete"
                  onClick={() => removeProduct(product._id)}
                >
                  <Delete />
                </div>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>LKR {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>LKR 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>LKR -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>LKR {total}</SummaryItemPrice>
            </SummaryItem>
            <form action="/checkout" class="inline">
              <Button onClick={() => setProduct()} href={`/checkout`}>
                CHECKOUT NOW
              </Button>
            </form>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
}

export default Cart;
