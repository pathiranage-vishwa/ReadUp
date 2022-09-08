import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart1.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSeller] = state.userAPI.isSeller;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

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
