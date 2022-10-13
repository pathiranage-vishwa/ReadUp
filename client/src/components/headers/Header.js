import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart1.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { SidebarData } from "../sidebar/SidebarData";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

const Avatar = styled.div`
  width: 160px;
  height: 160px;
  overflow: hidden;
  position: relative;
  top: 12px;
  left: 72px;
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
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const setData = (user) => {
    let { _id, firstName, lastName, username, email, userType, image } = user;

    localStorage.setItem("uid", _id);
    localStorage.setItem("FirstName", firstName);
    localStorage.setItem("LastName", lastName);
    localStorage.setItem("UserName", username);
    localStorage.setItem("Email", email);
    localStorage.setItem("UserType", userType);
    localStorage.setItem("Image", image);
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
      </>
    );
  };

  const sellerRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_book">Add Book</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/managerequests">Manage Requests</Link>
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
    <div className="header">
    <main>
      <a href={"/"}>
      <div className="logo"></div>
      </a>
      </main>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          {isLogged?
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>:null}
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-close">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <Avatar>
              <div>
                <a
                  href={`/userProfile/${user._id}`}
                  onClick={() => setData(user)}
                >
                  <img src={user.image} alt="" />
                </a>
              </div>
            </Avatar>
            <br />
            {SidebarData.map((item, index) => {
              return (
                <div>
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                </div>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>

      {/* <div className="logo">
        <Link to="/">{isAdmin ? "Admin" : "DevAT Shop"}</Link>
      </div> */}
      <div style={{"marginLeft":"40%"}}>
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
      </div>

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
    </div>
  );
}

export default Header;
