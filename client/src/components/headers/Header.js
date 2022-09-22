import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart1.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Avatar = styled.div`
  width: 70px;
  height: 70px;
  overflow: hidden;
  position: relative;
  top: 12px;
  border: 2px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
`;

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSeller] = state.userAPI.isSeller;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);
  const [user] = state.userAPI.user;

  console.log(user.image);

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_book">Create Book</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
          <li>
              <Link to="/managerequests">Manage Requests</Link>
          </li>
        <li>
          <Link to="/allusers">Registered Users</Link>
        </li>
      </>
    );
  };

  const sellerRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_book">Create Book</Link>
        </li>
          <li>
              <Link to="/managerequests">Manage Requests</Link>
          </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <><li>
          <Link to="/requestHome">Request Books</Link>
      </li>
        <li>
          <Link to="/request">Request Books</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
        <li>
          <Avatar>
            <div>
              <img src={user.image} alt="" />
            </div>
          </Avatar>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header className="logo">
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>

      {/* <div className="logo">
        <Link to="/">{isAdmin ? "Admin" : "DevAT Shop"}</Link>
      </div> */}

      <ul style={styleMenu}>
        <li>
          <Link to="/books">{isAdmin ? "Books" : "Store"}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isSeller && sellerRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login</Link>&nbsp
            <Link to="/register">Register</Link>
          </li>
        )}
        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
